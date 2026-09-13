import { getMockStore, query, isPostgresActive } from '../config/db.js';

export async function getDashboardKPIs(req, res) {
  try {
    const store = getMockStore();

    // Calculate Today's POS sales
    const today = new Date().toISOString().split('T')[0];
    const todayPosSales = store.pos_transactions
      .filter(t => t.created_at.startsWith(today))
      .reduce((sum, t) => sum + Number(t.total_amount), 0);

    // B2B Invoices
    const totalInvoices = store.sales_invoices.reduce((sum, i) => sum + Number(i.total_amount), 0);
    const totalReceivables = store.customers.reduce((sum, c) => sum + Number(c.current_balance || 0), 0);
    const totalPayables = store.vendors.reduce((sum, v) => sum + Number(v.current_balance || 0), 0);

    // Cash and Bank
    const cashAcc = store.chart_of_accounts.find(a => a.code === '1010');
    const bankAcc = store.chart_of_accounts.find(a => a.code === '1020');
    const cashInHand = cashAcc ? cashAcc.current_balance : 45000;
    const bankBalance = bankAcc ? bankAcc.current_balance : 320000;

    // Low stock items
    const lowStockItems = store.products.filter(p => p.stock <= p.reorder_level);

    // Expiring batches in next 60 days
    const expiringBatches = store.product_batches.filter(b => {
      const days = Math.ceil((new Date(b.expiry_date) - new Date()) / (1000 * 60 * 60 * 24));
      return days <= 60;
    });

    // 7-day sales trend (simulated + actual)
    const salesTrend = [
      { day: 'Mon', pos: 18500, wholesale: 32000 },
      { day: 'Tue', pos: 22400, wholesale: 45000 },
      { day: 'Wed', pos: 19800, wholesale: 28000 },
      { day: 'Thu', pos: 27600, wholesale: 51000 },
      { day: 'Fri', pos: 35200, wholesale: 64000 },
      { day: 'Sat', pos: 48900, wholesale: 18000 },
      { day: 'Sun', pos: todayPosSales > 0 ? todayPosSales : 39500, wholesale: 15400 }
    ];

    let bookerLocations = store.booker_locations || [];
    if (isPostgresActive()) {
       try {
         const blRes = await query('SELECT * FROM booker_locations ORDER BY updated_at DESC');
         if (blRes.rows && blRes.rows.length > 0) {
           bookerLocations = blRes.rows;
         }
       } catch (err) {
         console.warn('[DB] Failed to query booker_locations from PostgreSQL:', err.message);
       }
    }
    const activeBookersCount = bookerLocations.filter(b => b.status !== 'OFFLINE').length;

    res.json({
      success: true,
      kpis: {
        today_pos_sales: todayPosSales > 0 ? todayPosSales : 39500,
        total_monthly_revenue: 875000,
        total_receivables: totalReceivables,
        total_payables: totalPayables,
        cash_in_hand: cashInHand,
        bank_balance: bankBalance,
        total_stock_value: 520000,
        low_stock_count: lowStockItems.length,
        expiring_batches_count: expiringBatches.length,
        active_bookers_count: activeBookersCount
      },
      active_booker_locations: bookerLocations,
      low_stock_items: lowStockItems,
      expiring_batches: expiringBatches,
      sales_trend: salesTrend
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
