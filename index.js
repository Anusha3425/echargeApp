import express from 'express';
import pkg from 'body-parser';
import { config } from 'dotenv';
import authMiddleware from './ocpi/middleware.js';
import locationsRoute from './routes/locations.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;
const { json } = pkg;
// Middleware
app.use(json());
app.use(authMiddleware);

// Routes
app.use('/ocpi/2.2.1/locations', locationsRoute);

// OCPI Versions Endpoint
app.get('/ocpi/versions', (req, res) => {
  res.json({
    data: [
      { version: "2.2.1", url: `${process.env.BASE_URL}/versions` }
    ],
    status_code: 1000,
    timestamp: new Date().toISOString(),
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`OCPI server running at http://localhost:${PORT}`);
});
