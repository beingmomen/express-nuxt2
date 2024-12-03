const express = require('express')
const serverless = require('serverless-http')
const mongoose = require('mongoose')
const app = express()

// Configure Mongoose
mongoose.set('strictQuery', false)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// Middleware
app.use(express.json())

// Routes
app.use('/.netlify/functions/api/categories', require('../../server/routes/categories'))
app.use('/.netlify/functions/api/products', require('../../server/routes/products'))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Export handler for serverless
exports.handler = serverless(app)
