import express from 'express'
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/').get(protect, admin, getAllUsers)
router.route(`/delete/:id`).delete(protect, admin, deleteUser)
router
  .route(`/:id`)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById)

export default router
