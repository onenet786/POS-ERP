import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { WebSocketServer } from 'ws';
import apiRouter from './routes/api.routes.js';
import { initDb, isPostgresActive } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Security & Parsing Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// WebSocket Server for Real-Time Event Sync (Live POS sales, low stock alerts)
const wss = new WebSocketServer({ server, path: '/ws' });
const wsClients = new Set();

wss.on('connection', (ws) => {
  wsClients.add(ws);
  ws.send(JSON.stringify({ type: 'CONNECTED', message: 'ApexERP Realtime Sync Stream Connected' }));

  ws.on('close', () => {
    wsClients.delete(ws);
  });
});

export function broadcastEvent(event, payload) {
  const msg = JSON.stringify({ type: event, payload, timestamp: new Date().toISOString() });
  for (const client of wsClients) {
    if (client.readyState === 1) { // OPEN
      client.send(msg);
    }
  }
}

// API Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    system: 'ApexERP & POS Enterprise',
    version: '1.0.0',
    postgres_connected: isPostgresActive(),
    timestamp: new Date().toISOString()
  });
});

// Mount Module APIs
app.use('/api', apiRouter);

// Serve Frontend static build if present
const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
app.use(express.static(frontendDist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/ws')) {
    return next();
  }
  res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>ApexERP & POS API Service</title><style>body{font-family:sans-serif;background:#0f172a;color:#f8fafc;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}</style></head>
          <body>
            <div style="text-align:center;padding:2rem;background:#1e293b;border-radius:12px;border:1px solid #334155;max-width:500px">
              <h2 style="color:#38bdf8;margin-top:0">ApexERP & POS Backend API</h2>
              <p>Status: <strong style="color:#4ade80">ONLINE & READY</strong></p>
              <p>PostgreSQL Support: <strong>Enabled</strong></p>
              <p>API Endpoint: <code><a href="/api/health" style="color:#60a5fa">/api/health</a></code></p>
            </div>
          </body>
        </html>
      `);
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error]', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Bootstrap Server & Database
server.listen(PORT, async () => {
  console.log('====================================================');
  console.log(`  ApexERP & POS Enterprise Service`);
  console.log(`  Listening on HTTP & WS Port: ${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('====================================================');
  await initDb();
});
