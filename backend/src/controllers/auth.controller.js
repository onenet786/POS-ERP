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

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role_name: user.role_name || 'Cashier'
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
        role_name: user.role_name || 'Cashier'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getProfile(req, res) {
  res.json({ success: true, user: req.user });
}
