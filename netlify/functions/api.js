const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Middleware
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Export the handler
module.exports.handler = serverless(app);
