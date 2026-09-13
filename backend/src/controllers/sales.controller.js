import QRCode from 'qrcode';
import { getMockStore, query, isPostgresActive } from '../config/db.js';
import { LedgerService } from '../services/ledgerService.js';
import { broadcastEvent } from '../server.js';

export async function getSalesOrders(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, orders: store.sales_orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createSalesOrder(req, res) {
  try {
    const {
      customer_id,
      items,
      warehouse_id,
      discount_amount,
      geo_latitude,
      geo_longitude,
      notes
    } = req.body;

    if (!customer_id || !items || !items.length) {
      return res.status(400).json({ success: false, message: 'Customer and items are required' });
    }

    const store = getMockStore();
    const customer = store.customers.find(c => c.id === Number(customer_id));
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    let subtotal = 0;
    let tax_amount = 0;

    const processedItems = items.map(i => {
      const prod = store.products.find(p => p.id === Number(i.product_id));
      const unitPrice = Number(i.unit_price || prod?.selling_price || 0);
      const qty = Number(i.quantity || 1);
      const taxRate = Number(prod?.tax_rate || 0);
      const lineSubtotal = unitPrice * qty;
      const lineTax = (lineSubtotal * taxRate) / 100;

      subtotal += lineSubtotal;
      tax_amount += lineTax;

      return {
        product_id: prod ? prod.id : i.product_id,
        name: prod ? prod.name : 'Product',
        quantity: qty,
        unit_price: unitPrice,
        tax_rate: taxRate,
        tax_amount: lineTax,
        total_price: lineSubtotal + lineTax
      };
    });

    const discount = Number(discount_amount) || 0;
    const total_amount = subtotal - discount + tax_amount;
    const order_number = `SO-${new Date().getFullYear()}-${String(store.sales_orders.length + 1).padStart(4, '0')}`;

    const newOrder = {
      id: store.sales_orders.length + 1,
      order_number,
      order_date: new Date().toISOString().split('T')[0],
      customer_id: customer.id,
      customer_name: customer.business_name || customer.name,
      salesperson_id: req.user?.id || 4,
      salesperson_name: req.user?.full_name || 'Hamza Khan (Field Booker)',
      warehouse_id: Number(warehouse_id) || 1,
      warehouse_name: 'Central Logistics Warehouse',
      status: 'CONFIRMED',
      subtotal,
      tax_amount,
      discount_amount: discount,
      total_amount,
      geo_latitude: geo_latitude || customer.geo_latitude || null,
      geo_longitude: geo_longitude || customer.geo_longitude || null,
      notes: notes || '',
      items: processedItems,
      created_at: new Date().toISOString()
    };

    store.sales_orders.unshift(newOrder);

    broadcastEvent('NEW_SALES_ORDER', { order_number, customer: newOrder.customer_name, total: total_amount });

    res.json({
      success: true,
      message: 'Sales Order booked successfully',
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getInvoices(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, invoices: store.sales_invoices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createInvoice(req, res) {
  try {
    const { order_id, customer_id, items, discount_amount, paid_amount } = req.body;
    const store = getMockStore();

    const customer = store.customers.find(c => c.id === Number(customer_id));
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    let subtotal = 0;
    let tax_amount = 0;

    const processedItems = (items || []).map(i => {
      const prod = store.products.find(p => p.id === Number(i.product_id));
      const unitPrice = Number(i.unit_price || prod?.selling_price || 0);
      const qty = Number(i.quantity || 1);
      const taxRate = Number(prod?.tax_rate || 0);
      const lineSubtotal = unitPrice * qty;
      const lineTax = (lineSubtotal * taxRate) / 100;
      subtotal += lineSubtotal;
      tax_amount += lineTax;

      return {
        product_id: prod ? prod.id : i.product_id,
        name: prod ? prod.name : 'Item',
        quantity: qty,
        unit_price: unitPrice,
        tax_amount: lineTax,
        total_price: lineSubtotal + lineTax
      };
    });

    const discount = Number(discount_amount) || 0;
    const total_amount = subtotal - discount + tax_amount;
    const paid = Number(paid_amount) || 0;
    const balance = Math.max(0, total_amount - paid);
    const invoice_number = `INV-${new Date().getFullYear()}-${String(store.sales_invoices.length + 1).padStart(4, '0')}`;

    // Generate E-Invoice compliant QR Code
    const qrPayload = JSON.stringify({
      seller: process.env.COMPANY_NAME || 'Apex Commercial Enterprise',
      tax_id: process.env.COMPANY_TAX_ID || 'NTN-7492019-2',
      invoice_no: invoice_number,
      timestamp: new Date().toISOString(),
      total: total_amount.toFixed(2),
      tax: tax_amount.toFixed(2)
    });
    const qrCodeDataUri = await QRCode.toDataURL(qrPayload);

    const newInvoice = {
      id: store.sales_invoices.length + 1,
      invoice_number,
      invoice_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      customer_id: customer.id,
      customer_name: customer.business_name || customer.name,
      subtotal,
      tax_amount,
      discount_amount: discount,
      total_amount,
      paid_amount: paid,
      balance_amount: balance,
      status: balance === 0 ? 'PAID' : (paid > 0 ? 'PARTIALLY_PAID' : 'UNPAID'),
      einvoice_qr_code: qrCodeDataUri,
      items: processedItems,
      created_at: new Date().toISOString()
    };

    store.sales_invoices.unshift(newInvoice);

    // Update customer ledger balance
    customer.current_balance += balance;

    // Post to General Ledger: Debit AR (1200), Credit Sales Revenue (4020), Credit Tax (2020)
    await LedgerService.postAutomatedEntry({
      reference: invoice_number,
      narration: `E-Invoice Generation for ${customer.business_name || customer.name}`,
      sourceDocument: 'SALES_INVOICE',
      sourceId: newInvoice.id,
      lines: [
        { accountId: 1200, debit: total_amount, credit: 0, memo: `Receivable from ${customer.name}` },
        { accountId: 4020, debit: 0, credit: subtotal - discount, memo: `Sales Revenue` },
        ...(tax_amount > 0 ? [{ accountId: 2020, debit: 0, credit: tax_amount, memo: `Tax Payable` }] : [])
      ]
    });

    res.json({
      success: true,
      message: 'Sales Invoice generated with compliant QR Code',
      invoice: newInvoice
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getCustomers(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, customers: store.customers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getBookerLocations(req, res) {
  try {
    const store = getMockStore();
    res.json({
      success: true,
      locations: store.booker_locations || []
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateBookerLocation(req, res) {
  try {
    const {
      latitude,
      longitude,
      human_location,
      accuracy,
      battery_level,
      speed,
      status,
      shop_id,
      shop_name,
      address
    } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ success: false, message: 'Latitude and longitude are required' });
    }

    const store = getMockStore();
    const userId = req.user?.id || 4;
    const bookerName = req.user?.full_name || 'Hamza Khan (Field Booker)';
    const phone = req.user?.phone || '+92 300 9876543';

    if (!store.booker_locations) {
      store.booker_locations = [];
    }

    let existing = store.booker_locations.find(b => b.user_id === userId);
    const now = new Date().toISOString();

    if (existing) {
      existing.latitude = Number(latitude);
      existing.longitude = Number(longitude);
      if (human_location) existing.human_location = human_location;
      if (accuracy !== undefined) existing.accuracy = Number(accuracy);
      if (battery_level !== undefined) existing.battery_level = Number(battery_level);
      if (speed !== undefined) existing.speed = Number(speed);
      if (status) existing.status = status;
      if (shop_id) existing.current_shop_id = Number(shop_id);
      if (shop_name) existing.current_shop_name = shop_name;
      if (address) existing.address = address;
      existing.updated_at = now;
    } else {
      existing = {
        id: store.booker_locations.length + 1,
        user_id: userId,
        booker_name: bookerName,
        phone,
        latitude: Number(latitude),
        longitude: Number(longitude),
        human_location: human_location || address || 'Field Location Identified',
        accuracy: Number(accuracy || 10.0),
        battery_level: Number(battery_level || 90),
        speed: Number(speed || 0.0),
        status: status || 'CHECKED_IN',
        current_shop_id: shop_id ? Number(shop_id) : 2,
        current_shop_name: shop_name || 'Al-Madina Superstore',
        address: address || 'Current Field Location',
        created_at: now,
        updated_at: now
      };
      store.booker_locations.push(existing);
    }

    // Live PostgreSQL Upsert if Postgres is active
    if (isPostgresActive()) {
      try {
        const checkRes = await query('SELECT id FROM booker_locations WHERE user_id = $1', [userId]);
        if (checkRes.rows && checkRes.rows.length > 0) {
          await query(
            `UPDATE booker_locations 
             SET latitude = $1, longitude = $2, accuracy = $3, battery_level = $4, 
                 speed = $5, status = $6, current_shop_id = $7, current_shop_name = $8, 
                 address = $9, human_location = $10, updated_at = CURRENT_TIMESTAMP
             WHERE user_id = $11`,
            [
              Number(latitude), Number(longitude), Number(accuracy || 10),
              Number(battery_level || 88), Number(speed || 0), status || 'CHECKED_IN',
              shop_id ? Number(shop_id) : null, shop_name || null,
              address || null, human_location || null, userId
            ]
          );
        } else {
          await query(
            `INSERT INTO booker_locations 
             (user_id, booker_name, phone, latitude, longitude, accuracy, battery_level, speed, status, current_shop_id, current_shop_name, address, human_location, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [
              userId, bookerName, phone, Number(latitude), Number(longitude),
              Number(accuracy || 10), Number(battery_level || 88), Number(speed || 0),
              status || 'CHECKED_IN', shop_id ? Number(shop_id) : null, shop_name || null, address || null, human_location || null
            ]
          );
        }
      } catch (dbErr) {
        console.warn('[DB] Booker location upsert warning:', dbErr.message);
      }
    }

    // Broadcast live event to connected dashboards via WebSocket
    broadcastEvent('BOOKER_LOCATION_UPDATE', existing);

    res.json({
      success: true,
      message: 'Booker live location saved successfully',
      location: existing
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

