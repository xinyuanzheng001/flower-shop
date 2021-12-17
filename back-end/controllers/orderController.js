import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc   Update order to paid
//@route  GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc     Get logged in user orders
//@route    GET /api/orders/myorders
//@access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const count = await Order.countDocuments({ user: req.user._id })
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ orders, page, pages: Math.ceil(count / pageSize) })
})

//@desc     Get User orders
//@route    GET /api/orders/:id/orders
//@access   Admin only
const getUserOrders = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const count = await Order.countDocuments({ user: req.params.id })
  const orders = await Order.find({ user: req.params.id })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ orders, page, pages: Math.ceil(count / pageSize) })
})

//@desc     Get all orders
//@route    GET /api/orders
//@access   Admin only
const getAllOrders = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const count = await Order.countDocuments({})
  const orders = await Order.find({})
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  if (orders) {
    res.json({ orders, page, pages: Math.ceil(count / pageSize) })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc      Update order to delivered
//@route     PUT /api/orders/:id
//@access    Admin only
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getUserOrders,
  getAllOrders,
  updateOrderToDelivered,
}
