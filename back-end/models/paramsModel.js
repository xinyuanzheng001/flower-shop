import mongoose from 'mongoose'

const categoryListSchema = mongoose.Schema({
  category: { type: String },
})
const paramsSchema = mongoose.Schema({
  taxRate: {
    type: Number,
    required: true,
    default: 0,
  },
  deliveryCharge: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  pickUpAddress: {
    type: String,
    required: true,
  },
  categoryList: [categoryListSchema],
})

const Params = mongoose.model('Params', paramsSchema)

export default Params
