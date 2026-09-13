import { query, getMockStore, isPostgresActive } from '../config/db.js';

/**
 * ============================================================================
 * PRODUCTS CONTROLLERS (CRUD & Stock Tracking)
 * ============================================================================
 */
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
      let products = store.products.filter(p => p.is_active !== false);

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
    const {
      name,
      sku,
      barcode,
      category_id,
      uom,
      cost_price,
      selling_price,
      tax_rate,
      reorder_level,
      is_batch_tracked,
      is_manufactured,
      initial_stock,
      warehouse_id
    } = req.body;

    if (!name || !sku || selling_price === undefined) {
      return res.status(400).json({ success: false, message: 'Name, SKU, and Selling Price are required' });
    }

    const assignedBarcode = barcode || `BC-${Date.now().toString().slice(-8)}`;
    const cost = Number(cost_price) || 0;
    const sell = Number(selling_price);
    const tax = Number(tax_rate) || 0;
    const reorder = Number(reorder_level) || 10;
    const unitMeasure = uom || 'Pcs';
    const initStock = Number(initial_stock) || 0;
    const targetWh = Number(warehouse_id) || 1;

    if (isPostgresActive()) {
      const result = await query(
        `INSERT INTO products (name, sku, barcode, category_id, uom, cost_price, selling_price, tax_rate, reorder_level, is_batch_tracked, is_manufactured, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, TRUE) RETURNING *`,
        [name, sku, assignedBarcode, category_id || null, unitMeasure, cost, sell, tax, reorder, !!is_batch_tracked, !!is_manufactured]
      );
      const product = result.rows[0];

      // If initial opening stock was specified, log it in stock_ledger
      if (initStock > 0) {
        await query(
          `INSERT INTO stock_ledger (product_id, warehouse_id, quantity, unit_cost, total_cost, transaction_type, reference_type)
           VALUES ($1, $2, $3, $4, $5, 'PURCHASE', 'OPENING_BALANCE')`,
          [product.id, targetWh, initStock, cost, cost * initStock]
        );
        product.stock = initStock;
      } else {
        product.stock = 0;
      }

      // Fetch category name
      if (product.category_id) {
        const catRes = await query(`SELECT name FROM categories WHERE id = $1`, [product.category_id]);
        product.category_name = catRes.rows[0]?.name || 'General';
      }

      res.json({ success: true, product });
    } else {
      const store = getMockStore();
      const cat = store.categories.find(c => c.id === Number(category_id));
      const newProduct = {
        id: store.products.length + 1,
        name,
        sku,
        barcode: assignedBarcode,
        category_id: Number(category_id) || 1,
        category_name: cat ? cat.name : 'General',
        uom: unitMeasure,
        cost_price: cost,
        selling_price: sell,
        tax_rate: tax,
        stock: initStock,
        reorder_level: reorder,
        is_batch_tracked: !!is_batch_tracked,
        is_manufactured: !!is_manufactured,
        is_active: true
      };
      store.products.push(newProduct);

      if (initStock > 0) {
        store.stock_ledger = store.stock_ledger || [];
        store.stock_ledger.push({
          id: store.stock_ledger.length + 1,
          product_id: newProduct.id,
          product_name: newProduct.name,
          warehouse_id: targetWh,
          warehouse_name: store.warehouses.find(w => w.id === targetWh)?.name || 'Central Logistics Warehouse',
          quantity: initStock,
          unit_cost: cost,
          transaction_type: 'OPENING_STOCK',
          created_at: new Date().toISOString()
        });
      }

      res.json({ success: true, product: newProduct });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const {
      name,
      sku,
      barcode,
      category_id,
      uom,
      cost_price,
      selling_price,
      tax_rate,
      reorder_level,
      is_batch_tracked,
      is_manufactured
    } = req.body;

    if (!id || !name || !sku || selling_price === undefined) {
      return res.status(400).json({ success: false, message: 'ID, Name, SKU, and Selling Price are required' });
    }

    if (isPostgresActive()) {
      const result = await query(
        `UPDATE products 
         SET name = $1, sku = $2, barcode = $3, category_id = $4, uom = $5,
             cost_price = $6, selling_price = $7, tax_rate = $8, reorder_level = $9,
             is_batch_tracked = $10, is_manufactured = $11, updated_at = CURRENT_TIMESTAMP
         WHERE id = $12 RETURNING *`,
        [name, sku, barcode || null, category_id || null, uom || 'Pcs',
         Number(cost_price) || 0, Number(selling_price), Number(tax_rate) || 0,
         Number(reorder_level) || 10, !!is_batch_tracked, !!is_manufactured, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      const product = result.rows[0];
      if (product.category_id) {
        const catRes = await query(`SELECT name FROM categories WHERE id = $1`, [product.category_id]);
        product.category_name = catRes.rows[0]?.name || 'General';
      }
      res.json({ success: true, product });
    } else {
      const store = getMockStore();
      const product = store.products.find(p => p.id === Number(id));
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      product.name = name;
      product.sku = sku;
      product.barcode = barcode || product.barcode;
      product.category_id = Number(category_id) || product.category_id;
      const cat = store.categories.find(c => c.id === product.category_id);
      product.category_name = cat ? cat.name : product.category_name;
      product.uom = uom || product.uom;
      product.cost_price = Number(cost_price) || 0;
      product.selling_price = Number(selling_price);
      product.tax_rate = Number(tax_rate) || 0;
      product.reorder_level = Number(reorder_level) || 10;
      product.is_batch_tracked = !!is_batch_tracked;
      product.is_manufactured = !!is_manufactured;

      res.json({ success: true, product });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    if (isPostgresActive()) {
      await query(`UPDATE products SET is_active = FALSE WHERE id = $1`, [id]);
      res.json({ success: true, message: 'Product deactivated successfully' });
    } else {
      const store = getMockStore();
      const p = store.products.find(prod => prod.id === Number(id));
      if (p) p.is_active = false;
      res.json({ success: true, message: 'Product deactivated successfully' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * ============================================================================
 * CATEGORIES CONTROLLERS (CRUD)
 * ============================================================================
 */
export async function getCategories(req, res) {
  try {
    if (isPostgresActive()) {
      const result = await query(`
        SELECT c.*, COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON p.category_id = c.id AND p.is_active = TRUE
        GROUP BY c.id
        ORDER BY c.name ASC
      `);
      res.json({ success: true, categories: result.rows });
    } else {
      const store = getMockStore();
      const categories = store.categories.map(c => ({
        ...c,
        product_count: store.products.filter(p => p.category_id === c.id && p.is_active !== false).length
      }));
      res.json({ success: true, categories });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createCategory(req, res) {
  try {
    const { name, code, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const catCode = code || `CAT-${Date.now().toString().slice(-4)}`;

    if (isPostgresActive()) {
      const result = await query(
        `INSERT INTO categories (name, code, description) VALUES ($1, $2, $3) RETURNING *`,
        [name, catCode, description || '']
      );
      res.json({ success: true, category: result.rows[0] });
    } else {
      const store = getMockStore();
      const newCat = {
        id: store.categories.length + 1,
        name,
        code: catCode,
        description: description || '',
        product_count: 0
      };
      store.categories.push(newCat);
      res.json({ success: true, category: newCat });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, code, description } = req.body;
    if (!id || !name) {
      return res.status(400).json({ success: false, message: 'ID and Category Name are required' });
    }

    if (isPostgresActive()) {
      const result = await query(
        `UPDATE categories SET name = $1, code = $2, description = $3 WHERE id = $4 RETURNING *`,
        [name, code, description || '', id]
      );
      res.json({ success: true, category: result.rows[0] });
    } else {
      const store = getMockStore();
      const cat = store.categories.find(c => c.id === Number(id));
      if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
      cat.name = name;
      cat.code = code || cat.code;
      cat.description = description || '';
      res.json({ success: true, category: cat });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    if (isPostgresActive()) {
      await query(`DELETE FROM categories WHERE id = $1`, [id]);
      res.json({ success: true, message: 'Category deleted successfully' });
    } else {
      const store = getMockStore();
      store.categories = store.categories.filter(c => c.id !== Number(id));
      res.json({ success: true, message: 'Category deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * ============================================================================
 * WAREHOUSES & HUBS CONTROLLERS (CRUD & Location Breakdown)
 * ============================================================================
 */
export async function getWarehouses(req, res) {
  try {
    if (isPostgresActive()) {
      const result = await query(`
        SELECT w.*, 
               COALESCE(COUNT(DISTINCT sl.product_id), 0) as unique_products_count,
               COALESCE(SUM(sl.quantity), 0) as total_stock_units
        FROM warehouses w
        LEFT JOIN stock_ledger sl ON w.id = sl.warehouse_id
        WHERE w.is_active = TRUE
        GROUP BY w.id
        ORDER BY w.id ASC
      `);
      res.json({ success: true, warehouses: result.rows });
    } else {
      const store = getMockStore();
      const warehouses = store.warehouses.filter(w => w.is_active !== false).map(w => ({
        ...w,
        unique_products_count: store.products.length,
        total_stock_units: store.products.reduce((acc, p) => acc + (p.stock || 0), 0)
      }));
      res.json({ success: true, warehouses });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createWarehouse(req, res) {
  try {
    const { name, code, address, phone, is_default } = req.body;
    if (!name || !code) {
      return res.status(400).json({ success: false, message: 'Warehouse name and code are required' });
    }

    if (isPostgresActive()) {
      if (is_default) {
        await query(`UPDATE warehouses SET is_default = FALSE WHERE is_default = TRUE`);
      }
      const result = await query(
        `INSERT INTO warehouses (name, code, address, phone, is_default, is_active)
         VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING *`,
        [name, code, address || '', phone || '', !!is_default]
      );
      res.json({ success: true, warehouse: result.rows[0] });
    } else {
      const store = getMockStore();
      if (is_default) {
        store.warehouses.forEach(w => w.is_default = false);
      }
      const newWh = {
        id: store.warehouses.length + 1,
        name,
        code,
        address: address || '',
        phone: phone || '',
        is_default: !!is_default,
        is_active: true,
        unique_products_count: 0,
        total_stock_units: 0
      };
      store.warehouses.push(newWh);
      res.json({ success: true, warehouse: newWh });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateWarehouse(req, res) {
  try {
    const { id } = req.params;
    const { name, code, address, phone, is_default } = req.body;
    if (!id || !name || !code) {
      return res.status(400).json({ success: false, message: 'ID, Name, and Code are required' });
    }

    if (isPostgresActive()) {
      if (is_default) {
        await query(`UPDATE warehouses SET is_default = FALSE WHERE is_default = TRUE AND id != $1`, [id]);
      }
      const result = await query(
        `UPDATE warehouses 
         SET name = $1, code = $2, address = $3, phone = $4, is_default = $5
         WHERE id = $6 RETURNING *`,
        [name, code, address || '', phone || '', !!is_default, id]
      );
      res.json({ success: true, warehouse: result.rows[0] });
    } else {
      const store = getMockStore();
      const wh = store.warehouses.find(w => w.id === Number(id));
      if (!wh) return res.status(404).json({ success: false, message: 'Warehouse not found' });
      if (is_default) {
        store.warehouses.forEach(w => w.is_default = false);
      }
      wh.name = name;
      wh.code = code;
      wh.address = address || '';
      wh.phone = phone || '';
      wh.is_default = !!is_default;
      res.json({ success: true, warehouse: wh });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteWarehouse(req, res) {
  try {
    const { id } = req.params;
    if (isPostgresActive()) {
      await query(`UPDATE warehouses SET is_active = FALSE WHERE id = $1`, [id]);
      res.json({ success: true, message: 'Warehouse deactivated successfully' });
    } else {
      const store = getMockStore();
      const wh = store.warehouses.find(w => w.id === Number(id));
      if (wh) wh.is_active = false;
      res.json({ success: true, message: 'Warehouse deactivated successfully' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * ============================================================================
 * INTER-WAREHOUSE TRANSFERS & PERPETUAL STOCK LEDGER AUDIT
 * ============================================================================
 */
export async function transferStock(req, res) {
  try {
    const { product_id, from_warehouse_id, to_warehouse_id, quantity, notes } = req.body;

    if (!product_id || !from_warehouse_id || !to_warehouse_id || !quantity) {
      return res.status(400).json({ success: false, message: 'Product, Source Warehouse, Destination Warehouse, and Quantity are required' });
    }

    if (Number(from_warehouse_id) === Number(to_warehouse_id)) {
      return res.status(400).json({ success: false, message: 'Source and Destination warehouses cannot be the same' });
    }

    const qty = Number(quantity);
    if (qty <= 0) {
      return res.status(400).json({ success: false, message: 'Transfer quantity must be greater than zero' });
    }

    if (isPostgresActive()) {
      // Check source stock
      const stockRes = await query(
        `SELECT COALESCE(SUM(quantity), 0) as stock FROM stock_ledger WHERE product_id = $1 AND warehouse_id = $2`,
        [product_id, from_warehouse_id]
      );
      const available = Number(stockRes.rows[0]?.stock || 0);
      if (available < qty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock in source warehouse. Available: ${available} units, requested: ${qty} units.`
        });
      }

      // Get product cost price
      const prodRes = await query(`SELECT cost_price, name FROM products WHERE id = $1`, [product_id]);
      const cost = Number(prodRes.rows[0]?.cost_price || 0);

      // Record Transfer Out
      await query(
        `INSERT INTO stock_ledger (product_id, warehouse_id, quantity, unit_cost, total_cost, transaction_type, reference_type)
         VALUES ($1, $2, $3, $4, $5, 'TRANSFER_OUT', $6)`,
        [product_id, from_warehouse_id, -qty, cost, -(cost * qty), notes || `Transfer to WH #${to_warehouse_id}`]
      );

      // Record Transfer In
      await query(
        `INSERT INTO stock_ledger (product_id, warehouse_id, quantity, unit_cost, total_cost, transaction_type, reference_type)
         VALUES ($1, $2, $3, $4, $5, 'TRANSFER_IN', $6)`,
        [product_id, to_warehouse_id, qty, cost, cost * qty, notes || `Transfer from WH #${from_warehouse_id}`]
      );

      res.json({
        success: true,
        message: `Successfully transferred ${qty} units of ${prodRes.rows[0]?.name || 'product'}`
      });
    } else {
      const store = getMockStore();
      const prod = store.products.find(p => p.id === Number(product_id));
      const fromWh = store.warehouses.find(w => w.id === Number(from_warehouse_id));
      const toWh = store.warehouses.find(w => w.id === Number(to_warehouse_id));

      store.stock_ledger = store.stock_ledger || [];
      const cost = prod ? prod.cost_price : 0;

      store.stock_ledger.push({
        id: store.stock_ledger.length + 1,
        product_id: Number(product_id),
        product_name: prod ? prod.name : 'Product',
        warehouse_id: Number(from_warehouse_id),
        warehouse_name: fromWh ? fromWh.name : 'Source WH',
        quantity: -qty,
        unit_cost: cost,
        transaction_type: 'TRANSFER_OUT',
        notes: `Transfer to ${toWh?.name}`,
        created_at: new Date().toISOString()
      });

      store.stock_ledger.push({
        id: store.stock_ledger.length + 1,
        product_id: Number(product_id),
        product_name: prod ? prod.name : 'Product',
        warehouse_id: Number(to_warehouse_id),
        warehouse_name: toWh ? toWh.name : 'Destination WH',
        quantity: qty,
        unit_cost: cost,
        transaction_type: 'TRANSFER_IN',
        notes: `Transfer from ${fromWh?.name}`,
        created_at: new Date().toISOString()
      });

      res.json({
        success: true,
        message: `Successfully transferred ${qty} units of ${prod?.name}`
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getStockLedger(req, res) {
  try {
    if (isPostgresActive()) {
      const result = await query(`
        SELECT sl.*, p.name as product_name, p.sku as product_sku, w.name as warehouse_name
        FROM stock_ledger sl
        JOIN products p ON sl.product_id = p.id
        JOIN warehouses w ON sl.warehouse_id = w.id
        ORDER BY sl.created_at DESC
        LIMIT 100
      `);
      res.json({ success: true, ledger: result.rows });
    } else {
      const store = getMockStore();
      const ledger = (store.stock_ledger || []).slice(-100).reverse();
      res.json({ success: true, ledger });
    }
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

    const qty = Number(quantity);
    const targetWh = Number(warehouse_id) || 1;

    if (isPostgresActive()) {
      const prodRes = await query(`SELECT cost_price, name FROM products WHERE id = $1`, [product_id]);
      const cost = Number(unit_cost) || Number(prodRes.rows[0]?.cost_price || 0);

      await query(
        `INSERT INTO stock_ledger (product_id, warehouse_id, quantity, unit_cost, total_cost, transaction_type, reference_type)
         VALUES ($1, $2, $3, $4, $5, 'ADJUSTMENT', $6)`,
        [product_id, targetWh, qty, cost, cost * qty, reason || 'Cycle Count Reconciliation']
      );

      // Get updated total stock
      const updatedStockRes = await query(
        `SELECT COALESCE(SUM(quantity), 0) as stock FROM stock_ledger WHERE product_id = $1`,
        [product_id]
      );

      res.json({
        success: true,
        message: `Stock adjusted by ${qty > 0 ? '+' : ''}${qty} units`,
        current_stock: Number(updatedStockRes.rows[0]?.stock || 0)
      });
    } else {
      const store = getMockStore();
      const prod = store.products.find(p => p.id === Number(product_id));
      const wh = store.warehouses.find(w => w.id === targetWh);
      if (prod) {
        prod.stock = (prod.stock || 0) + qty;
      }
      store.stock_ledger = store.stock_ledger || [];
      store.stock_ledger.push({
        id: store.stock_ledger.length + 1,
        product_id: Number(product_id),
        product_name: prod ? prod.name : 'Product',
        warehouse_id: targetWh,
        warehouse_name: wh ? wh.name : 'Warehouse',
        quantity: qty,
        unit_cost: prod ? prod.cost_price : 0,
        transaction_type: 'ADJUSTMENT',
        notes: reason || 'Stock Adjustment',
        created_at: new Date().toISOString()
      });

      res.json({
        success: true,
        message: `Stock adjusted by ${qty > 0 ? '+' : ''}${qty} units`,
        current_stock: prod?.stock
      });
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
