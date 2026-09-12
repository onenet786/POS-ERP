import { query, getMockStore, isPostgresActive } from '../config/db.js';

export async function getCompanies(req, res) {
  try {
    if (isPostgresActive()) {
      const result = await query('SELECT * FROM companies ORDER BY id ASC');
      return res.json({ success: true, companies: result.rows });
    }
    const store = getMockStore();
    res.json({ success: true, companies: store.companies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateCompany(req, res) {
  try {
    const { id } = req.params;
    const { name, legal_name, tax_id, strn, phone, email, address, city, currency } = req.body;

    if (isPostgresActive()) {
      const result = await query(
        `UPDATE companies 
         SET name = COALESCE($1, name),
             legal_name = COALESCE($2, legal_name),
             tax_id = COALESCE($3, tax_id),
             strn = COALESCE($4, strn),
             phone = COALESCE($5, phone),
             email = COALESCE($6, email),
             address = COALESCE($7, address),
             city = COALESCE($8, city),
             currency = COALESCE($9, currency),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $10 RETURNING *`,
        [name, legal_name, tax_id, strn, phone, email, address, city, currency, id]
      );
      return res.json({ success: true, company: result.rows[0], message: 'Company profile updated successfully' });
    }

    const store = getMockStore();
    const company = store.companies.find(c => c.id === parseInt(id));
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    if (name) company.name = name;
    if (legal_name) company.legal_name = legal_name;
    if (tax_id) company.tax_id = tax_id;
    if (strn) company.strn = strn;
    if (phone) company.phone = phone;
    if (email) company.email = email;
    if (address) company.address = address;
    if (city) company.city = city;
    if (currency) company.currency = currency;

    res.json({ success: true, company, message: 'Company profile updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createCompany(req, res) {
  try {
    const { name, legal_name, tax_id, strn, phone, email, address, city, currency } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Company name is required' });
    }

    if (isPostgresActive()) {
      const result = await query(
        `INSERT INTO companies (name, legal_name, tax_id, strn, phone, email, address, city, currency)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [name, legal_name || name, tax_id || '', strn || '', phone || '', email || '', address || '', city || 'Lahore', currency || 'PKR']
      );
      return res.status(201).json({ success: true, company: result.rows[0], message: 'New company created successfully' });
    }

    const store = getMockStore();
    const newComp = {
      id: store.companies.length + 1,
      name,
      legal_name: legal_name || name,
      tax_id: tax_id || 'NTN-Pending',
      strn: strn || '',
      phone: phone || '',
      email: email || '',
      address: address || 'Pakistan',
      city: city || 'Lahore',
      currency: currency || 'PKR',
      is_active: true
    };
    store.companies.push(newComp);
    res.status(201).json({ success: true, company: newComp, message: 'New company created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
