import { query, getMockStore, isPostgresActive } from '../config/db.js';

export class LedgerService {
  /**
   * Automatically creates a balanced General Journal Entry
   * @param {Object} entryData
   * {
   *   reference: string,
   *   narration: string,
   *   sourceDocument: string,
   *   sourceId: number,
   *   lines: [ { accountId: number, debit: number, credit: number, memo?: string } ]
   * }
   */
  static async postAutomatedEntry(entryData) {
    const totalDebit = entryData.lines.reduce((sum, l) => sum + (Number(l.debit) || 0), 0);
    const totalCredit = entryData.lines.reduce((sum, l) => sum + (Number(l.credit) || 0), 0);

    // Verify mathematical balance
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      throw new Error(`Double-entry balance violation: Debits ($${totalDebit}) must equal Credits ($${totalCredit})`);
    }

    const entryNumber = `JV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const today = new Date().toISOString().split('T')[0];

    if (isPostgresActive()) {
      const entryRes = await query(
        `INSERT INTO journal_entries (entry_number, date, reference, narration, source_document, source_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [entryNumber, today, entryData.reference, entryData.narration, entryData.sourceDocument, entryData.sourceId]
      );
      const entryId = entryRes.rows[0].id;

      for (const line of entryData.lines) {
        await query(
          `INSERT INTO journal_lines (journal_entry_id, account_id, debit, credit, memo)
           VALUES ($1, $2, $3, $4, $5)`,
          [entryId, line.accountId, line.debit || 0, line.credit || 0, line.memo || '']
        );

        // Update real-time account balance
        const balanceDelta = (line.debit || 0) - (line.credit || 0);
        await query(
          `UPDATE chart_of_accounts SET current_balance = current_balance + $1 WHERE id = $2`,
          [balanceDelta, line.accountId]
        );
      }
      return { id: entryId, entryNumber };
    } else {
      // Mock Store
      const store = getMockStore();
      const newEntry = {
        id: store.journal_entries.length + 1,
        entry_number: entryNumber,
        date: today,
        reference: entryData.reference,
        narration: entryData.narration,
        source_document: entryData.sourceDocument,
        lines: entryData.lines.map(l => {
          const acc = store.chart_of_accounts.find(a => a.id === l.accountId);
          return {
            account_id: l.accountId,
            account_name: acc ? acc.name : 'Ledger Account',
            debit: Number(l.debit) || 0,
            credit: Number(l.credit) || 0
          };
        })
      };

      // Adjust mock balances
      for (const line of entryData.lines) {
        const acc = store.chart_of_accounts.find(a => a.id === line.accountId);
        if (acc) {
          const delta = acc.normal_balance === 'Debit' ? (line.debit - line.credit) : (line.credit - line.debit);
          acc.current_balance += delta;
        }
      }

      store.journal_entries.unshift(newEntry);
      return { id: newEntry.id, entryNumber };
    }
  }

  /**
   * Post POS Cashier Sale
   */
  static async postPosSale(transaction) {
    const lines = [
      {
        accountId: transaction.payment_method === 'CASH' ? 1010 : 1040,
        debit: Number(transaction.total_amount),
        credit: 0,
        memo: `POS Receipt ${transaction.receipt_number}`
      },
      {
        accountId: 4010, // Retail Revenue
        debit: 0,
        credit: Number(transaction.subtotal) - Number(transaction.discount_amount || 0),
        memo: `Revenue from ${transaction.receipt_number}`
      }
    ];

    if (Number(transaction.tax_amount) > 0) {
      lines.push({
        accountId: 2020, // Sales Tax / VAT Payable
        debit: 0,
        credit: Number(transaction.tax_amount),
        memo: `Tax collected for ${transaction.receipt_number}`
      });
    }

    return this.postAutomatedEntry({
      reference: transaction.receipt_number,
      narration: `POS Automated Sales Posting for Receipt #${transaction.receipt_number}`,
      sourceDocument: 'POS_SALE',
      sourceId: transaction.id,
      lines
    });
  }

  /**
   * Post Manufacturing BOM Assembly (Raw materials consumed -> Finished Product)
   */
  static async postAssemblyOrder(assembly) {
    const lines = [
      {
        accountId: 1300, // Merchandise / Finished Goods Inventory
        debit: Number(assembly.total_production_cost),
        credit: 0,
        memo: `Manufactured ${assembly.produced_quantity} units of ${assembly.finished_product_name}`
      },
      {
        accountId: 1350, // Raw Materials Inventory
        debit: 0,
        credit: Number(assembly.total_production_cost),
        memo: `Raw materials consumed for order ${assembly.order_number}`
      }
    ];

    return this.postAutomatedEntry({
      reference: assembly.order_number,
      narration: `Automated BOM Assembly Completion: ${assembly.finished_product_name}`,
      sourceDocument: 'ASSEMBLY',
      sourceId: assembly.id,
      lines
    });
  }
}
