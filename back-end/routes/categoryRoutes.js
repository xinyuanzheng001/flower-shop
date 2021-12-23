import express from 'express'
import {
  addCategory,
  getCategories,
} from '../controllers/categoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getCategories).post(protect, admin, addCategory)

export default router
