import jwt from 'jsonwebtoken';
import { query, getMockStore, isPostgresActive } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'apexerppos_enterprise_super_secret_jwt_key_2026';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    // Verify user account active state in real-time
    try {
      if (isPostgresActive()) {
        const uRes = await query('SELECT id, is_active FROM users WHERE id = $1', [decodedUser.id]);
        if (uRes.rows.length === 0 || uRes.rows[0].is_active === false) {
          return res.status(403).json({
            success: false,
            code: 'ACCOUNT_DISABLED',
            message: 'Account Disabled: Your enterprise user access has been deactivated.'
          });
        }
      } else {
        const store = getMockStore();
        const found = store.users.find(u => u.id === decodedUser.id);
        if (!found || found.is_active === false) {
          return res.status(403).json({
            success: false,
            code: 'ACCOUNT_DISABLED',
            message: 'Account Disabled: Your enterprise user access has been deactivated.'
          });
        }
      }
    } catch (_) {}

    req.user = decodedUser;
    next();
  });
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role_name)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Requires one of [${allowedRoles.join(', ')}] roles`
      });
    }
    next();
  };
}
