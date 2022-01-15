import express from 'express'
import {
  addParams,
  getParams,
  updateParams,
} from '../controllers/paramsController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(protect, getParams)
  .put(protect, admin, updateParams)
  .post(protect, admin, addParams)

export default router
