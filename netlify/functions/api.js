const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Import and use routes
const categoriesRouter = require('../../server/routes/categories');
const productsRouter = require('../../server/routes/products');

// Use routes (without /api prefix)
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

// Error handler
// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Export the serverless function
exports.handler = serverless(app);
