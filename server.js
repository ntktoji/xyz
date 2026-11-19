require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be set and at least 32 characters'); process.exit(1);
}

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(','), credentials: false }));
app.use(express.json({ limit: '100kb' }));

app.use('/api/admin/login', rateLimit({ windowMs: 15 * 60e3, limit: 10, standardHeaders: true, legacyHeaders: false }));
app.use('/api/inquiries', rateLimit({ windowMs: 15 * 60e3, limit: 20, standardHeaders: true, legacyHeaders: false }));
app.use('/api/track', rateLimit({ windowMs: 60e3, limit: 60, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Central error handler: never leak stack traces to clients.
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`Jai Air Cargo API listening on :${port}`));
module.exports = app;
