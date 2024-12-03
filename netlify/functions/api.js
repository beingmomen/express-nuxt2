const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = express();

// Configure Mongoose
mongoose.set('strictQuery', false)

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// Middleware
app.use(express.json());

// Import route handlers
const categoriesRouter = require('../../server/routes/categories');
const productsRouter = require('../../server/routes/products');

// Use routes without /api prefix since Netlify adds it
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Netlify serverless API is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Export handler for Netlify
exports.handler = serverless(app);
