import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query, getMockStore, isPostgresActive } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'apexerppos_enterprise_super_secret_jwt_key_2026';

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    let user = null;

    if (isPostgresActive()) {
      const result = await query(
        `SELECT u.*, r.name as role_name 
         FROM users u 
         LEFT JOIN roles r ON u.role_id = r.id 
         WHERE u.username = $1 OR u.email = $1`,
        [username]
      );
      if (result.rows.length > 0) {
        user = result.rows[0];
      }
    } else {
      const store = getMockStore();
      user = store.users.find(u => u.username === username || u.email === username);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Default password check (allows demo password or bcrypt compare)
    const isPasswordValid = (password === 'Admin@123456' || password === 'admin') ||
      (await bcrypt.compare(password, user.password_hash));

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const store = getMockStore();
    const access = store.user_company_access.find(a => a.user_id === user.id);
    const assignedCompanies = access ? access.company_ids : [1];

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role_name: user.role_name || 'Cashier',
        assigned_companies: assignedCompanies
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role_name: user.role_name || 'Cashier',
        assigned_companies: assignedCompanies
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function googleLogin(req, res) {
  try {
    const { email, name, google_id } = req.body;
    const store = getMockStore();

    // Look for existing user or create SSO user
    let user = store.users.find(u => u.email === email);
    if (!user) {
      user = {
        id: store.users.length + 1,
        username: email.split('@')[0],
        email: email || 'user@google.com',
        full_name: name || 'Google Enterprise User',
        role_id: 1,
        role_name: 'Super Admin',
        is_active: true
      };
      store.users.push(user);
      store.user_company_access.push({ user_id: user.id, company_ids: [1, 2, 3] });
    }

    const access = store.user_company_access.find(a => a.user_id === user.id);
    const assignedCompanies = access ? access.company_ids : [1, 2, 3];

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role_name: user.role_name || 'Super Admin',
        assigned_companies: assignedCompanies
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
        role_name: user.role_name || 'Super Admin',
        assigned_companies: assignedCompanies,
        auth_provider: 'GOOGLE'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getProfile(req, res) {
  res.json({ success: true, user: req.user });
}

