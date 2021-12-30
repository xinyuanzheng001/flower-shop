import asyncHandler from 'express-async-handler'
import Params from '../models/paramsModel.js'

// @desc        Fetch all params
// @route       GET /api/params
// @access      Admin only
const getParams = asyncHandler(async (req, res) => {
  const params = await Params.findOne({})
  res.json(params)
})

// @desc        Add new params
// @route       POST /api/params
// @access      Admin only
const addParams = asyncHandler(async (req, res) => {
  const params = new Params({
    taxRate: req.body.taxRate,
    deliveryCharge: req.body.deliveryCharge,
    discount: req.body.discount,
  })
  const newParams = await params.save()
  res.status(201).json(newParams)
})

// @desc        Update params
// @route       PUT /api/params
// @access      Admin only
const updateParams = asyncHandler(async (req, res) => {
  const params = await Params.findOne({})
  params.taxRate = req.body.taxRate || params.taxRate
  params.deliveryCharge = req.body.deliveryCharge || params.deliveryCharge
  params.discount = req.body.discount || params.discount
  const updatedParams = await params.save()
  res.json(updatedParams)
})
export { getParams, updateParams, addParams }
