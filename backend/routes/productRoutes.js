import express from 'express';
//import Product from '../models/productModel.js';
import {
  createNewProduct,
  deleteProduct,
  getBestProducts,
  getKNNRecommendations,
  getProductBrands,
  getProductByBrand,
  getProductByCategory,
  getProductCategories,
  getProducts,
  getProductsById,
  newReview,
  updateProduct,
} from '../controllers/productControllers.js';
import { protect, isAdministrator } from '../middleware/authMiddleware.js';

const router = express.Router();
// instead of using try for all, we can use an express async handler.

// @desc Fetch all products
// @route GET /api/products
// @access Public

router
  .route('/')
  .get(getProducts)
  .post(protect, isAdministrator, createNewProduct);

router.get('/brand', getProductByBrand);
router.get('/category', getProductByCategory);
router.get('/brands', getProductBrands);
router.get('/categories', getProductCategories);
router.route('/:id/reviews').post(protect, newReview);
router.get('/best', getBestProducts);
router.get('/recommendations/:id', getKNNRecommendations);

// @desc Fetch specific product
// @route GET /api/products/:id
// @access Public

router
  .route('/:id')
  .get(getProductsById)
  .delete(protect, isAdministrator, deleteProduct)
  .put(protect, isAdministrator, updateProduct);

export default router;
