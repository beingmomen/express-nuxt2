const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category')
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category')
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.categoryId,
    stock: req.body.stock,
    image: req.body.image
  })

  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update product
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const updates = req.body
    Object.keys(updates).forEach((update) => {
      product[update] = updates[update]
    })

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    await product.remove()
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get products by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId }).populate('category')
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
