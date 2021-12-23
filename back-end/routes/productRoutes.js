import express from 'express'
// import Product from '../models/productModel.js'
// import asyncHandler from 'express-async-handler'
import {
  addProduct,
  addProductReview,
  deleteProductByID,
  getProductByID,
  getProducts,
  getTopProducts,
  getVipProducts,
  updateProduct,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// @desc Fetch all products
// @route GET /api/products
// @access Public

// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     // res.status(401)
//     // throw new Error('Not Authorized')
//     res.json(products)
//   })
// )
router.route('/').get(getProducts).post(protect, admin, addProduct)

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
// router.get(
//   '/:id',
//   asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)

//     if (product) {
//       res.json(product)
//     } else {
//       res.status(404).json({ message: 'Product not found' })
//     }
//   })
// )
router.route('/top').get(getTopProducts)
router.route('/vip').get(getVipProducts)
router
  .route('/:id')
  .get(getProductByID)
  .delete(protect, admin, deleteProductByID)
  .put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, addProductReview)

export default router
