import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ajaxAdapter from './routes/ajaxAdapter.js';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for local dev
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Mount legacy AJAX adapter at root and at /app1.5 to provide 100% fidelity
app.use('/', ajaxAdapter);
app.use('/app1.5', ajaxAdapter);

// Mount modern REST API
app.use('/api', apiRouter);

// Health check
app.get(['/health', '/api/health'], (req, res) => {
  res.json({
    status: "ok",
    mode: "LOCAL_DEV_NO_LOGIN",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  AyurQuest 1.5 Local Backend Adapter & Replica Server`);
  console.log(`  Running on: http://localhost:${PORT}`);
  console.log(`  Mode: LOCAL_DEV_NO_LOGIN=${process.env.LOCAL_DEV_NO_LOGIN}`);
  console.log(`=======================================================`);
});

