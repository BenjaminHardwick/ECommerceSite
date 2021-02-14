import express from 'express';
import Product from '../models/productModel.js';
import {
  getProducts,
  getProductsById,
} from '../controllers/productControllers.js';

const router = express.Router();
// instead of using try for all, we can use an express async handler.

// @desc Fetch all products
// @route GET /api/products
// @access Public

router.route('/').get(getProducts);

// @desc Fetch specific product
// @route GET /api/products/:id
// @access Public

router.route('/:id').get(getProductsById);

export default router;
