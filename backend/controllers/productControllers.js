import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import child_process from 'child_process';

// @desc Fetch specific product
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;

  const page = Number(req.query.pageNumber) || 1;

  const queries = req.query.queries
    ? {
        name: {
          $regex: req.query.queries,
          $options: 'i',
        },
      }
    : {};

  const categories = req.query.queries
    ? {
        category: {
          $regex: req.query.queries,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...queries });
  var products = await Product.find({ ...queries })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (products.length <= 0) {
    var products = await Product.find({ ...categories })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  }
  //console.log(products);

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch specific product
// @route GET /api/products/:id
// @access Public

const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Fetch product by categories
// @route GET /api/products/category/:category
// @access Public

/*
  get list into array, and ensure that each category is unique

*/

const getProductByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.query.category });
  //console.log(products);
  res.json(products);
});

// @desc Fetch product by categories
// @route GET /api/products/category/:category
// @access Public

/*
  get list into array, and ensure that each category is unique

*/

const getProductByBrand = asyncHandler(async (req, res) => {
  const products = await Product.find({ brand: req.query.brand });
  console.log(products);
  res.json(products);
});

// @desc Fetch categories
// @route GET /api/products/categories
// @access Public

const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await Product.find(
    {},
    { _id: false, category: true }
  ).distinct('category', function (error, ids) {
    category: '$category';
  });
  //console.log.json((categories));
  // console.log(categories);
  res.json(categories);
});

const getProductBrands = asyncHandler(async (req, res) => {
  const brands = await Product.find({}, { _id: false, brand: true }).distinct(
    'brand',
    function (error, ids) {
      brand: '$brand';
    }
  );
  //console.log.json((categories));
  //console.log(brands);
  brands;
  res.json(brands);
});

// @desc DELETE specific product
// @route DELETE /api/products/:id
// @access Admin/Private

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'this item has been removed' });
  } else {
    res.status(404);
    throw new Error('Product/item not found');
  }
});

// @desc Create a new product
// @route Put /api/products/
// @access Admin/Private

const createNewProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Example Name',
    price: 0,
    user: req.user._id,
    image: '/imgUpload/sample.jpg',
    brand: 'Example Brand',
    category: 'Example Category',
    countInStock: 10,
    numReviews: 0,
    description: 'Replace me with words',
  });
  const newProduct = await product.save();
  res.status(201).json(newProduct);
});

// @desc updateproduct
// @route Put /api/products/:id
// @access Admin/Private

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Make a new review
// @route POST /api/products/:id/review
// @access private

const newReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  //console.log(req.body);
  const product = await Product.findById(req.params.id);

  if (product) {
    const hasReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (hasReviewed) {
      res.status(400);
      throw new Error('Product has already been reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'review sent' });
  } else {
    //console.log('error');
    res.status(404);
    throw new Error('product is not found');
  }
});

// @desc Get best products based on rating
// @route Get /api/products/best
// @access public

const getBestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  res.json(products);
});
let output;

// @desc Get KNN recommendations based on ratings
// @route Get /api/products/recommendations/:id
// @access public

const getKNNRecommendations = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  var spawn = child_process.spawn;

  var py_process = spawn('python', [
    'C:/Users/benhe/OneDrive/Documents/University/Final Year Project/E-Commerce Site/backend/controllers/db.py',
  ]);

  var addToProducts = function (output) {
    var productNames = [];
    var item = '';
    for (var name in output) {
      item = output[name].name;
      console.log(item);
      productNames.push(item);
    }
    return productNames;
  };

  py_process.stdin.write(id.toString());
  py_process.stdin.end();
  py_process.stdout.on('data', (data) => {
    // console.log(JSON.parse(data));
    output = JSON.parse(data);
  });

  var product_names = addToProducts(output);

  const recommendations = await Product.find({ name: product_names }).sort({
    rating: -1,
  });
  try {
    if (product_names.length == 0) {
      await getKNNRecommendations();
    } else {
      res.json(recommendations);
    }
  } catch (error) {
    res.json(error);
  }
});

export {
  getProducts,
  getProductsById,
  deleteProduct,
  createNewProduct,
  updateProduct,
  getProductCategories,
  getProductByCategory,
  getProductBrands,
  newReview,
  getBestProducts,
  getProductByBrand,
  getKNNRecommendations,
};
