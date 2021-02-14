import express from 'express';
const router = express.Router();
import {
  addOrderedProducts,
  getOrderById,
  updateOrderIfPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderedProducts);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderIfPaid)

export default router;
