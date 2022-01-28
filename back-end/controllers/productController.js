import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  // show correct product in different page
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})
// @desc Fetch vip products
// @route GET /api/products/vip
//@access Public
const getVipProducts = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1
  const count = await Product.countDocuments({ vip: true })
  const products = await Product.find({ vip: true })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc  Fetch special category products
// @route   GET /api/products/category/:category
// @access  Public
const getCategoryProducts = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1
  const categoryName = req.params.category
  const count = await Product.countDocuments({ category: categoryName })
  const products = await Product.find({ category: categoryName })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize), categoryName })
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public

const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     Delete product by ID
//@route    DELETE /api/products/:id
//@access   Admin only
const deleteProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc       Add product
//@route      POST /api/products
//@access     Admin only
const addProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'none',
    description: 'Sample description',
    primeImage: '/images/sample.jpg',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc       Update product
//@route      PUT /api/products/:id
//@access     Admin only
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.image = req.body.image || product.image
    product.brand = req.body.brand || product.brand
    product.category = req.body.category || product.category
    product.description = req.body.description || product.description
    product.qtyOptions = req.body.qtyOptions || product.qtyOptions
    product.colorOptions = req.body.colorOptions || product.colorOptions
    product.primeImage = req.body.primeImage || product.primeImage
    product.vip = req.body.vip || product.vip
    product.addCountInStock = req.body.addCountInStock
    product.countInStock = req.body.countInStock || product.countInStock

    const updatedProduct = await product.save()
    res.json({
      id: updatedProduct.id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      image: updatedProduct.image,
      brand: updatedProduct.brand,
      category: updatedProduct.category,
      description: updatedProduct.description,
      qtyOptions: updatedProduct.qtyOptions,
      colorOptions: updatedProduct.colorOptions,
      primeImage: updatedProduct.primeImage,
      vip: updatedProduct.vip,
      addCountInStock: updatedProduct.addCountInStock,
      countInStock: updatedProduct.countInStock,
    })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc       Create Product reviews
//@route      POST /api/products/:id/review
//@access     Private
const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewd = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewd) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     Get top rated products
//@route    GET /api/products/top
//@access   Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getVipProducts,
  getCategoryProducts,
  getProductByID,
  deleteProductByID,
  addProduct,
  updateProduct,
  addProductReview,
  getTopProducts,
}
