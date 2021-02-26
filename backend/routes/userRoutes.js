import express from 'express';
const router = express.Router();
import {
  userAuth,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, isAdministrator } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdministrator, getAllUsers);
router.post('/login', userAuth);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, isAdministrator, deleteUser)
  .get(protect, isAdministrator, getUserById)
  .put(protect, isAdministrator, updateUser);
export default router;
