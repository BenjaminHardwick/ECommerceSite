import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Creation of an new order
// @route POST /api/orders
// @access Private
const addOrderedProducts = asyncHandler(async (req, res) => {
  const {
    orderedProducts,
    deliveryAddress,
    paymentMethod,
    productsPrice,
    taxPrice,
    deliveryFee,
    totalPrice,
  } = req.body;

  if (orderedProducts && orderedProducts.length === 0) {
    res.status(400);
    throw new Error('NO ORDERED ITEMS');
  } else {
    console.log('order added to DB');
    const order = new Order({
      user: req.user._id,
      orderedProducts,
      deliveryAddress,
      paymentMethod,
      productsPrice,
      taxPrice,
      deliveryFee,
      totalPrice,
    });
    // console.log('worked');
    const newOrder = await order.save();
    //console.log('worked after');
    res.status(201).json(newOrder);
  }
});

// @desc get order by its ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc update the order s.t. it is paid
// @route GET /api/orders/:id/pay
// @access Private

const updateOrderIfPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc used for displaying orders for a logged in user
// @route GET /api/orders/order-history
// @access Private

const getOrderHistory = asyncHandler(async (req, res) => {
  const orderHistory = await Order.find({ user: req.user._id });
  res.json(orderHistory);
});
export { addOrderedProducts, getOrderById, updateOrderIfPaid, getOrderHistory };
