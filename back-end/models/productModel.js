import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)
const qtyOptionSchema = mongoose.Schema({
  qty: { type: Number, required: true },
  qtyPrice: { type: Number, required: true },
})
const colorOptionSchema = mongoose.Schema({
  color: { type: String },
})
const productSchema = mongoose.Schema(
  {
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    name: {
      type: String,
      required: true,
    },
    image: [{ type: String, required: true }],
    primeImage: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    vip: {
      type: Boolean,
      required: true,
      default: false,
    },
    colorOptions: [colorOptionSchema],
    qtyOptions: [qtyOptionSchema],
    addCountInStock: {
      type: Boolean,
      default: false,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
