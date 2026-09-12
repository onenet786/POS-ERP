import bcrypt from 'bcryptjs';
import { query, getMockStore, isPostgresActive } from '../config/db.js';

export async function getUsers(req, res) {
  try {
    if (isPostgresActive()) {
      const result = await query(
        `SELECT u.id, u.username, u.email, u.full_name, u.phone, u.role_id, r.name as role_name, u.is_active, u.created_at,
                ARRAY_AGG(uca.company_id) FILTER (WHERE uca.company_id IS NOT NULL) as company_ids
         FROM users u
         LEFT JOIN roles r ON u.role_id = r.id
         LEFT JOIN user_company_access uca ON u.id = uca.user_id
         GROUP BY u.id, r.name
         ORDER BY u.id ASC`
      );
      return res.json({ success: true, users: result.rows });
    }

    const store = getMockStore();
    const usersWithAccess = store.users.map(u => {
      const access = store.user_company_access.find(a => a.user_id === u.id);
      return {
        ...u,
        company_ids: access ? access.company_ids : [1]
      };
    });
    res.json({ success: true, users: usersWithAccess });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const { username, email, password, full_name, phone, role_name, company_ids } = req.body;

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const hash = await bcrypt.hash(password, 10);
    const store = getMockStore();

    if (isPostgresActive()) {
      const roleRes = await query('SELECT id FROM roles WHERE name = $1', [role_name || 'Cashier']);
      const roleId = roleRes.rows[0]?.id || 3;

      const userRes = await query(
        `INSERT INTO users (username, email, password_hash, full_name, phone, role_id)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, full_name, role_id`,
        [username, email, hash, full_name, phone || '', roleId]
      );
      const newUser = userRes.rows[0];

      if (Array.isArray(company_ids)) {
        for (const cid of company_ids) {
          await query('INSERT INTO user_company_access (user_id, company_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [newUser.id, cid]);
        }
      }

      return res.status(201).json({ success: true, user: newUser, message: 'User created successfully' });
    }

    const newId = store.users.length + 1;
    const newUser = {
      id: newId,
      username,
      email,
      password_hash: hash,
      full_name,
      phone: phone || '',
      role_id: 3,
      role_name: role_name || 'Cashier',
      is_active: true
    };
    store.users.push(newUser);
    store.user_company_access.push({ user_id: newId, company_ids: company_ids || [1] });

    res.status(201).json({ success: true, user: newUser, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { full_name, phone, role_name, is_active, password, company_ids } = req.body;
    const store = getMockStore();

    if (isPostgresActive()) {
      if (password) {
        const hash = await bcrypt.hash(password, 10);
        await query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, id]);
      }
      if (role_name) {
        const roleRes = await query('SELECT id FROM roles WHERE name = $1', [role_name]);
        if (roleRes.rows[0]) {
          await query('UPDATE users SET role_id = $1 WHERE id = $2', [roleRes.rows[0].id, id]);
        }
      }
      await query(
        `UPDATE users 
         SET full_name = COALESCE($1, full_name),
             phone = COALESCE($2, phone),
             is_active = COALESCE($3, is_active),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $4`,
        [full_name, phone, is_active, id]
      );

      if (Array.isArray(company_ids)) {
        await query('DELETE FROM user_company_access WHERE user_id = $1', [id]);
        for (const cid of company_ids) {
          await query('INSERT INTO user_company_access (user_id, company_id) VALUES ($1, $2)', [id, cid]);
        }
      }
      return res.json({ success: true, message: 'User updated successfully' });
    }

    const user = store.users.find(u => u.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (full_name) user.full_name = full_name;
    if (phone) user.phone = phone;
    if (role_name) user.role_name = role_name;
    if (typeof is_active === 'boolean') user.is_active = is_active;
    if (password) user.password_hash = await bcrypt.hash(password, 10);

    if (Array.isArray(company_ids)) {
      let acc = store.user_company_access.find(a => a.user_id === user.id);
      if (acc) {
        acc.company_ids = company_ids;
      } else {
        store.user_company_access.push({ user_id: user.id, company_ids });
      }
    }

    res.json({ success: true, user, message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function getPermissionsMatrix(req, res) {
  try {
    const store = getMockStore();
    res.json({ success: true, matrix: store.permissions_matrix });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updatePermissionsMatrix(req, res) {
  try {
    const { matrix } = req.body;
    if (!matrix) {
      return res.status(400).json({ success: false, message: 'Permissions matrix required' });
    }

    const store = getMockStore();
    store.permissions_matrix = matrix;
    res.json({ success: true, matrix: store.permissions_matrix, message: 'Role permissions matrix updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
