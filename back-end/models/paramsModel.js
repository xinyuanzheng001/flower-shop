import mongoose from 'mongoose'

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
})

const Params = mongoose.model('Params', paramsSchema)

export default Params
