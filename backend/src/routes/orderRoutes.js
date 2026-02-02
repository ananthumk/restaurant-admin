const express = require('express');
const orderRouter = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getTopSellingItems
} = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validation');

orderRouter.get('/analytics/top-selling', getTopSellingItems);

orderRouter.get('/', getAllOrders);

orderRouter.get('/:id', getOrderById);

orderRouter.post('/', validateOrder, createOrder);

orderRouter.patch('/:id/status', updateOrderStatus);

module.exports = orderRouter;