import express from 'express';
const router = express.Router();
import {
  addOrderedProducts,
  getOrderById,
  getOrderHistory,
  updateOrderIfPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderedProducts);
router.route('/order-history').get(protect, getOrderHistory);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderIfPaid);

export default router;
