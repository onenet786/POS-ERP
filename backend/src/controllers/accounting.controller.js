import { getMockStore } from '../config/db.js';
import { LedgerService } from '../services/ledgerService.js';

export async function getChartOfAccounts(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, accounts: store.chart_of_accounts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getJournalEntries(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, entries: store.journal_entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createJournalVoucher(req, res) {
  try {
    const { reference, narration, lines } = req.body;
    if (!lines || lines.length < 2) {
      return res.status(400).json({ success: false, message: 'At least two balanced journal lines are required' });
    }

    const result = await LedgerService.postAutomatedEntry({
      reference: reference || 'MANUAL-JV',
      narration: narration || 'Manual Journal Voucher',
      sourceDocument: 'MANUAL_JV',
      sourceId: null,
      lines
    });

    res.json({ success: true, message: 'Journal Voucher posted successfully', entry: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

export async function getFinancialReports(req, res) {
  try {
    const store = getMockStore();
    const accounts = store.chart_of_accounts;

    // Trial Balance
    const trialBalance = accounts.map(a => {
      const isDebit = a.normal_balance === 'Debit';
      return {
        code: a.code,
        name: a.name,
        type: a.type,
        debit: isDebit ? a.current_balance : 0,
        credit: !isDebit ? a.current_balance : 0
      };
    });

    const totalDebits = trialBalance.reduce((sum, r) => sum + r.debit, 0);
    const totalCredits = trialBalance.reduce((sum, r) => sum + r.credit, 0);

    // Profit & Loss
    const revenues = accounts.filter(a => a.type === 'Revenue');
    const expenses = accounts.filter(a => a.type === 'Expense');
    const totalRevenue = revenues.reduce((sum, a) => sum + a.current_balance, 0);
    const totalExpense = expenses.reduce((sum, a) => sum + a.current_balance, 0);
    const netProfit = totalRevenue - totalExpense;

    // Balance Sheet
    const assets = accounts.filter(a => a.type === 'Asset');
    const liabilities = accounts.filter(a => a.type === 'Liability');
    const equity = accounts.filter(a => a.type === 'Equity');

    const totalAssets = assets.reduce((sum, a) => sum + a.current_balance, 0);
    const totalLiabilities = liabilities.reduce((sum, a) => sum + a.current_balance, 0);
    const totalEquity = equity.reduce((sum, a) => sum + a.current_balance, 0) + netProfit;

    res.json({
      success: true,
      trial_balance: {
        rows: trialBalance,
        total_debit: totalDebits,
        total_credit: totalCredits,
        is_balanced: Math.abs(totalDebits - totalCredits) < 0.01
      },
      profit_and_loss: {
        revenues,
        total_revenue: totalRevenue,
        expenses,
        total_expense: totalExpense,
        net_profit: netProfit
      },
      balance_sheet: {
        assets,
        total_assets: totalAssets,
        liabilities,
        total_liabilities: totalLiabilities,
        equity,
        net_profit_included: netProfit,
        total_equity_and_liabilities: totalLiabilities + totalEquity
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
