const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Import routes
const categoriesRouter = require('../../server/routes/categories');
const productsRouter = require('../../server/routes/products');

// Base path for serverless function
const router = express.Router();
router.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Mount routes on router
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);

// Mount router on app with base path
app.use('/.netlify/functions/api', router);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Export handler
const handler = serverless(app);
module.exports = { handler };
