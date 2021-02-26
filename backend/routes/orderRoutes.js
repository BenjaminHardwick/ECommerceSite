import express from 'express';
const router = express.Router();
import {
  addOrderedProducts,
  getAllOrders,
  getOrderById,
  getOrderHistory,
  updateDeliveryStatus,
  updateOrderIfPaid,
} from '../controllers/orderController.js';
import { isAdministrator, protect } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, addOrderedProducts)
  .get(protect, isAdministrator, getAllOrders);
router.route('/order-history').get(protect, getOrderHistory);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderIfPaid);
router
  .route('/:id/delivery')
  .put(protect, isAdministrator, updateDeliveryStatus);

export default router;
