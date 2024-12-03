const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Configure Mongoose
mongoose.set('strictQuery', false)

// Connect to MongoDB
mongoose.connect('mongodb+srv://beingmomen:HtJ2a7yTQeduJg5l@expresscluster.xgr93vd.mongodb.net/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// Middleware
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' })
})

// Routes
app.use('/categories', require('./routes/categories'))
app.use('/products', require('./routes/products'))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
