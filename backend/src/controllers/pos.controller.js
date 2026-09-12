import { query, getMockStore, isPostgresActive } from '../config/db.js';
import { LedgerService } from '../services/ledgerService.js';
import { broadcastEvent } from '../server.js';

export async function getActiveShift(req, res) {
  try {
    const store = getMockStore();
    const activeShift = store.pos_shifts.find(s => s.status === 'OPEN');
    res.json({
      success: true,
      has_active_shift: !!activeShift,
      shift: activeShift || null
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function openShift(req, res) {
  try {
    const { register_id, opening_cash } = req.body;
    const store = getMockStore();

    const existingOpen = store.pos_shifts.find(s => s.status === 'OPEN');
    if (existingOpen) {
      return res.status(400).json({ success: false, message: 'A shift is already open. Please close it first.' });
    }

    const reg = store.pos_registers.find(r => r.id === Number(register_id)) || store.pos_registers[0];
    const newShift = {
      id: store.pos_shifts.length + 1,
      register_id: reg.id,
      register_name: reg.name,
      cashier_id: req.user?.id || 3,
      cashier_name: req.user?.full_name || 'Cashier',
      opening_time: new Date().toISOString(),
      opening_cash: Number(opening_cash) || 0.00,
      expected_cash: Number(opening_cash) || 0.00,
      actual_cash: 0.00,
      status: 'OPEN'
    };

    store.pos_shifts.unshift(newShift);
    res.json({ success: true, message: 'Register shift opened successfully', shift: newShift });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function closeShift(req, res) {
  try {
    const { actual_cash, notes } = req.body;
    const store = getMockStore();
    const activeShift = store.pos_shifts.find(s => s.status === 'OPEN');

    if (!activeShift) {
      return res.status(400).json({ success: false, message: 'No active shift found to close' });
    }

    activeShift.closing_time = new Date().toISOString();
    activeShift.actual_cash = Number(actual_cash) || 0.00;
    activeShift.cash_difference = activeShift.actual_cash - activeShift.expected_cash;
    activeShift.status = 'CLOSED';
    activeShift.notes = notes || '';

    res.json({
      success: true,
      message: 'Register shift closed and balanced',
      shift: activeShift
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function checkout(req, res) {
  try {
    const {
      customer_id,
      warehouse_id,
      items,
      discount_amount,
      payment_method,
      paid_amount
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty' });
    }

    const store = getMockStore();
    const activeShift = store.pos_shifts.find(s => s.status === 'OPEN');

    let subtotal = 0;
    let tax_amount = 0;

    // Process and validate items & deduct inventory
    const processedItems = items.map(item => {
      const prod = store.products.find(p => p.id === Number(item.product_id));
      const unitPrice = Number(item.unit_price || prod?.selling_price || 0);
      const qty = Number(item.quantity || 1);
      const taxRate = Number(prod?.tax_rate || 0);
      const lineSubtotal = unitPrice * qty;
      const lineTax = (lineSubtotal * taxRate) / 100;

      subtotal += lineSubtotal;
      tax_amount += lineTax;

      // Real-time stock reduction
      if (prod) {
        prod.stock = Math.max(0, prod.stock - qty);
      }

      return {
        product_id: prod ? prod.id : item.product_id,
        name: prod ? prod.name : item.name,
        sku: prod ? prod.sku : '',
        quantity: qty,
        unit_price: unitPrice,
        tax_rate: taxRate,
        tax_amount: lineTax,
        total_price: lineSubtotal + lineTax
      };
    });

    const discount = Number(discount_amount) || 0;
    const total_amount = Math.max(0, subtotal - discount + tax_amount);
    const paid = Number(paid_amount) || total_amount;
    const change_amount = Math.max(0, paid - total_amount);

    const receipt_number = `POS1-${new Date().toISOString().slice(0, 7).replace('-', '')}-${String(store.pos_transactions.length + 1).padStart(4, '0')}`;

    const customer = store.customers.find(c => c.id === Number(customer_id)) || store.customers[0];

    const transaction = {
      id: store.pos_transactions.length + 1,
      receipt_number,
      shift_id: activeShift ? activeShift.id : 1,
      customer_id: customer.id,
      customer_name: customer.name,
      subtotal,
      discount_amount: discount,
      tax_amount,
      total_amount,
      paid_amount: paid,
      change_amount,
      payment_method: payment_method || 'CASH',
      items: processedItems,
      created_at: new Date().toISOString()
    };

    store.pos_transactions.unshift(transaction);

    // Update active shift expected cash
    if (activeShift && transaction.payment_method === 'CASH') {
      activeShift.expected_cash += total_amount;
    }

    // Automatically post to Double-Entry General Ledger!
    await LedgerService.postPosSale(transaction);

    // Real-time broadcast to connected clients
    broadcastEvent('POS_SALE', { receipt_number, total_amount, cashier: req.user?.full_name || 'Cashier' });

    res.json({
      success: true,
      message: 'Sale processed successfully',
      transaction
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getTransactions(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, transactions: store.pos_transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
