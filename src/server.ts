import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = Number(process.env.PORT || 3000);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN || '').split(',').map(x => x.trim()).filter(Boolean), credentials: false }));
app.use(express.json({ limit: '32kb' }));

app.get('/health', (_req, res) => res.status(200).json({ ok: true, service: 'clinic-booking-api' }));
app.get('/health/db', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true, database: 'reachable' }); }
  catch { res.status(503).json({ ok: false, database: 'unavailable' }); }
});

app.use((_req, res) => res.status(404).json({ error: 'not_found' }));
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // Do not return internal errors, SQL, or credentials to clients.
  console.error('request_error', err instanceof Error ? err.message : 'unknown');
  res.status(500).json({ error: 'internal_error' });
});

app.listen(port, () => console.log(`Clinic API listening on ${port}`));
process.on('SIGTERM', async () => { await pool.end(); process.exit(0); });
