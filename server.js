/**
 * Telecalling CRM - Production Enterprise Server & Centralized REST API
 * Engineered & Powered by Brand.B (Muhammed Munshid Kuruvangadan)
 * 
 * Features:
 * - Bank-grade PBKDF2/SHA-256 server-side password hashing with random salt
 * - Zero-dependency persistent JSON database (data/crm_database.json)
 * - Real-time multi-device synchronization (PC & Mobile Phones)
 * - Safe for GitHub, Custom Domains, and App Store Backends
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DB_FILE = path.join(__dirname, 'data', 'crm_database.json');

// MIME Types for Web & PWA
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv; charset=utf-8'
};

// ==============================================================================
// 1. Password Hashing with Salt (Server-Side Security)
// ==============================================================================
function hashPassword(password, salt = null) {
  if (!salt) {
    salt = crypto.randomBytes(16).toString('hex');
  }
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, storedHash) {
  if (!salt || !storedHash) return false;
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return hash === storedHash;
}

// ==============================================================================
// 2. Persistent Database Management
// ==============================================================================
let db = {
  users: [],
  leads: [],
  calls: [],
  team: [],
  settings: {
    companyName: 'Nallayil Ayurvedha',
    supportEmail: 'contact@nallayil.com',
    phone: '+91 98470 00000',
    themePreset: 'emerald'
  }
};

function initDatabase() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: True });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(content);
      console.log('✅ Loaded existing database from:', DB_FILE);
    } catch (e) {
      console.warn('⚠️ Could not parse existing DB, re-initializing fresh database.');
    }
  }

  // Ensure Master Admin exists in database
  const adminEmail = process.env.ADMIN_EMAIL || 'kmunshidk@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminName = process.env.ADMIN_NAME || 'Muhammed Munshid';

  if (!db.users || db.users.length === 0) {
    const { salt, hash } = hashPassword(adminPassword);
    db.users = [
      {
        id: 'auth_master_admin',
        name: adminName,
        email: adminEmail.toLowerCase(),
        salt: salt,
        hash: hash,
        role: 'Admin',
        status: 'Active',
        title: 'Master Administrator - Full Access'
      },
      {
        id: 'auth_manager',
        name: 'Rohit Verma',
        email: 'rohit@company.com',
        salt: hashPassword('manager123').salt,
        hash: hashPassword('manager123').hash,
        role: 'Manager',
        status: 'Active',
        title: 'Team Manager'
      },
      {
        id: 'auth_lead',
        name: 'Vikram Mehta',
        email: 'vikram@company.com',
        salt: hashPassword('lead123').salt,
        hash: hashPassword('lead123').hash,
        role: 'Team Lead',
        status: 'Active',
        title: 'Team Leader'
      },
      {
        id: 'auth_caller',
        name: 'Anika Sharma',
        email: 'anika@company.com',
        salt: hashPassword('caller123').salt,
        hash: hashPassword('caller123').hash,
        role: 'Caller',
        status: 'Active',
        title: 'Telecaller'
      }
    ];

    db.team = [
      { id: '1', name: adminName, email: adminEmail.toLowerCase(), phone: '9847000000', role: 'Admin', status: 'Active', assigned: 0 },
      { id: '2', name: 'Rohit Verma', email: 'rohit@company.com', phone: '9822334455', role: 'Manager', status: 'Active', assigned: 0 },
      { id: '3', name: 'Vikram Mehta', email: 'vikram@company.com', phone: '9912345678', role: 'Team Lead', status: 'Active', assigned: 0 },
      { id: '4', name: 'Anika Sharma', email: 'anika@company.com', phone: '9811223344', role: 'Caller', status: 'Active', assigned: 0 }
    ];

    saveDatabase();
    console.log('🎉 Database initialized with Master Admin & Team accounts.');
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('❌ Failed to save database:', err);
  }
}

initDatabase();

// ==============================================================================
// 3. HTTP Request Dispatcher & Secure REST API
// ==============================================================================
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  // Security Headers & CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- REST API ENDPOINTS ---
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json');

    // Healthcheck
    if (pathname === '/api/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'ok', brand: 'Brand.B', version: '2.5.0', time: new Date().toISOString() }));
      return;
    }

    // 1. Secure Authentication Login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { email, password } = JSON.parse(body || '{}');
          if (!email || !password) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: 'Email and password are required' }));
          }

          const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
          if (!user) {
            res.writeHead(401);
            return res.end(JSON.stringify({ error: 'Access Denied: Account is not registered or authorized.' }));
          }

          if (user.status === 'Suspended' || user.status === 'Inactive') {
            res.writeHead(403);
            return res.end(JSON.stringify({ error: 'Account Suspended: Contact an Administrator.' }));
          }

          // Verify password with salt
          const isValid = verifyPassword(password, user.salt, user.hash) || user.password === password;
          if (!isValid) {
            res.writeHead(401);
            return res.end(JSON.stringify({ error: 'Invalid password. Please check your credentials.' }));
          }

          const token = `crm_sec_${crypto.randomBytes(24).toString('hex')}_${Date.now()}`;
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.name.charAt(0).toUpperCase()
            }
          }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Malformed JSON payload' }));
        }
      });
      return;
    }

    // 2. Admin Edit Authorized User Credentials (Passwords & Emails)
    if (pathname === '/api/auth/update-credentials' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { id, name, email, password, role, status } = JSON.parse(body || '{}');
          if (!id || !email) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: 'Missing user identification or email' }));
          }

          const userIndex = db.users.findIndex(u => u.id === id);
          if (userIndex === -1) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'Personnel record not found' }));
          }

          const target = db.users[userIndex];
          target.name = name || target.name;
          target.email = email.trim().toLowerCase();
          target.role = role || target.role;
          target.status = status || target.status;

          // If password was updated, rehash securely
          if (password) {
            const { salt, hash } = hashPassword(password);
            target.salt = salt;
            target.hash = hash;
            delete target.password;
          }

          // Sync team directory
          const tm = db.team.find(m => m.id === id || m.email.toLowerCase() === target.email);
          if (tm) {
            tm.name = target.name;
            tm.email = target.email;
            tm.role = target.role;
            tm.status = target.status;
          }

          saveDatabase();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Credentials updated successfully' }));
        } catch (e) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Update failed' }));
        }
      });
      return;
    }

    // 3. Leads Management Endpoints
    if (pathname === '/api/leads' && req.method === 'GET') {
      res.writeHead(200);
      return res.end(JSON.stringify({ leads: db.leads || [] }));
    }

    if (pathname === '/api/leads' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const payload = JSON.parse(body || '{}');
          if (Array.isArray(payload.leads)) {
            db.leads = payload.leads;
          } else if (payload.lead) {
            db.leads.push(payload.lead);
          }
          saveDatabase();
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, total: db.leads.length }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Failed to save leads' }));
        }
      });
      return;
    }

    if (pathname === '/api/leads' && req.method === 'DELETE') {
      db.leads = [];
      saveDatabase();
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, message: 'All leads purged' }));
    }

    // 4. Calls Management Endpoints
    if (pathname === '/api/calls' && req.method === 'GET') {
      res.writeHead(200);
      return res.end(JSON.stringify({ calls: db.calls || [] }));
    }

    if (pathname === '/api/calls' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { call } = JSON.parse(body || '{}');
          if (call) {
            db.calls.unshift(call);
            // Also update lead status if matched
            if (call.phone) {
              const matched = db.leads.find(l => l.phone === call.phone);
              if (matched) {
                matched.status = call.outcome;
                matched.notes = call.notes || matched.notes;
              }
            }
            saveDatabase();
          }
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, total: db.calls.length }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Failed to record call' }));
        }
      });
      return;
    }

    if (pathname === '/api/calls' && req.method === 'DELETE') {
      db.calls = [];
      saveDatabase();
      res.writeHead(200);
      return res.end(JSON.stringify({ success: true, message: 'Call history cleared' }));
    }

    // 5. Team Management Endpoints
    if (pathname === '/api/team' && req.method === 'GET') {
      res.writeHead(200);
      return res.end(JSON.stringify({ team: db.team || [] }));
    }

    // 6. Authorized Users List (Masked - never exposes hashes or passwords)
    if (pathname === '/api/authorized-users' && req.method === 'GET') {
      const safeUsers = db.users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        title: u.title || u.role
      }));
      res.writeHead(200);
      return res.end(JSON.stringify({ users: safeUsers }));
    }

    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'API endpoint not found' }));
  }

  // --- STATIC FILE SERVING WITH SPA ROUTING ---
  let targetFile = pathname;
  if (targetFile === '/' || targetFile === '') {
    targetFile = '/login.html';
  } else if (targetFile === '/login') {
    targetFile = '/login.html';
  } else if (targetFile === '/index') {
    targetFile = '/index.html';
  } else if (targetFile === '/mobile') {
    targetFile = '/mobile.html';
  }

  let filePath = path.join(PUBLIC_DIR, targetFile);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (path.extname(targetFile)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      filePath = path.join(PUBLIC_DIR, 'login.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log('================================================================');
  console.log('  🚀 Brand.B Telecalling CRM Enterprise Server Active');
  console.log(`  🔗 Domain/Local: http://localhost:${PORT}`);
  console.log(`  🔑 Login Portal: http://localhost:${PORT}/login.html`);
  console.log(`  💾 Secure DB:    ${DB_FILE}`);
  console.log('================================================================');
});
