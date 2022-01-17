import express from 'express'
import {
  addCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router
  .route('/')
  .get(getCategories)
  .post(protect, admin, addCategory)
  .put(protect, admin, updateCategory)

export default router
