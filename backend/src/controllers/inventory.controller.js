import { query, getMockStore, isPostgresActive } from '../config/db.js';

export async function getProducts(req, res) {
  try {
    const { search, category_id, barcode } = req.query;

    if (isPostgresActive()) {
      let sql = `
        SELECT p.*, c.name as category_name,
               COALESCE(SUM(sl.quantity), 0) as stock
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN stock_ledger sl ON p.id = sl.product_id
        WHERE p.is_active = TRUE
      `;
      const params = [];

      if (search) {
        params.push(`%${search}%`);
        sql += ` AND (p.name ILIKE $${params.length} OR p.sku ILIKE $${params.length} OR p.barcode ILIKE $${params.length})`;
      }
      if (category_id) {
        params.push(category_id);
        sql += ` AND p.category_id = $${params.length}`;
      }
      if (barcode) {
        params.push(barcode);
        sql += ` AND p.barcode = $${params.length}`;
      }

      sql += ` GROUP BY p.id, c.name ORDER BY p.name ASC`;
      const result = await query(sql, params);
      return res.json({ success: true, products: result.rows });
    } else {
      const store = getMockStore();
      let products = [...store.products];

      if (search) {
        const q = search.toLowerCase();
        products = products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.barcode && p.barcode.includes(q))
        );
      }
      if (category_id) {
        products = products.filter(p => String(p.category_id) === String(category_id));
      }
      if (barcode) {
        products = products.filter(p => p.barcode === barcode);
      }

      return res.json({ success: true, products });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, sku, barcode, category_id, cost_price, selling_price, tax_rate, reorder_level, is_batch_tracked, is_manufactured } = req.body;

    if (!name || !sku || selling_price === undefined) {
      return res.status(400).json({ success: false, message: 'Name, SKU, and Selling Price are required' });
    }

    if (isPostgresActive()) {
      const result = await query(
        `INSERT INTO products (name, sku, barcode, category_id, cost_price, selling_price, tax_rate, reorder_level, is_batch_tracked, is_manufactured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [name, sku, barcode || null, category_id || null, cost_price || 0, selling_price, tax_rate || 0, reorder_level || 10, !!is_batch_tracked, !!is_manufactured]
      );
      res.json({ success: true, product: result.rows[0] });
    } else {
      const store = getMockStore();
      const cat = store.categories.find(c => c.id === Number(category_id));
      const newProduct = {
        id: store.products.length + 1,
        name,
        sku,
        barcode: barcode || `BC-${Date.now().toString().slice(-8)}`,
        category_id: Number(category_id) || 1,
        category_name: cat ? cat.name : 'General',
        cost_price: Number(cost_price) || 0,
        selling_price: Number(selling_price),
        tax_rate: Number(tax_rate) || 0,
        stock: 0,
        reorder_level: Number(reorder_level) || 10,
        is_batch_tracked: !!is_batch_tracked,
        is_manufactured: !!is_manufactured
      };
      store.products.push(newProduct);
      res.json({ success: true, product: newProduct });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getCategories(req, res) {
  try {
    if (isPostgresActive()) {
      const result = await query(`SELECT * FROM categories ORDER BY name ASC`);
      res.json({ success: true, categories: result.rows });
    } else {
      res.json({ success: true, categories: getMockStore().categories });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getWarehouses(req, res) {
  try {
    if (isPostgresActive()) {
      const result = await query(`SELECT * FROM warehouses WHERE is_active = TRUE ORDER BY id ASC`);
      res.json({ success: true, warehouses: result.rows });
    } else {
      res.json({ success: true, warehouses: getMockStore().warehouses });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getBatchExpiryReport(req, res) {
  try {
    const store = getMockStore();
    const batches = store.product_batches.map(b => {
      const prod = store.products.find(p => p.id === b.product_id);
      const daysUntilExpiry = Math.ceil((new Date(b.expiry_date) - new Date()) / (1000 * 60 * 60 * 24));
      return {
        ...b,
        product_name: prod ? prod.name : 'Product',
        product_sku: prod ? prod.sku : '',
        days_until_expiry: daysUntilExpiry,
        status: daysUntilExpiry < 0 ? 'EXPIRED' : (daysUntilExpiry <= 60 ? 'EXPIRING_SOON' : 'GOOD')
      };
    });
    res.json({ success: true, batches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function adjustStock(req, res) {
  try {
    const { product_id, warehouse_id, quantity, reason, unit_cost } = req.body;
    if (!product_id || !quantity) {
      return res.status(400).json({ success: false, message: 'Product and quantity required' });
    }

    const store = getMockStore();
    const prod = store.products.find(p => p.id === Number(product_id));
    if (prod) {
      prod.stock += Number(quantity);
    }
    res.json({ success: true, message: `Stock adjusted by ${quantity} units`, current_stock: prod?.stock });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
