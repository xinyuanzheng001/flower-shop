import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: [{ type: String }],
        price: { type: Number, required: true },
        color: { type: String },
        qtyAmount: { type: Number },
        qtyAmountPrice: { type: Number },
        primeImage: { type: String },
        cardMessage: { type: String },
        specialInstruction: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    // shippingAddress: {
    //   address: { type: String, required: true, default: '' },
    //   city: { type: String, required: true, default: '' },
    //   postalCode: { type: String, required: true, default: '' },
    //   // country: { type: String, required: true },
    // },
    receiverInfo: {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      receiveDate: { type: Date, required: true },
      receiveMethod: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    receiveMethod: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    isPickUped: {
      type: Boolean,
      required: true,
      default: false,
    },
    pickupAt: {
      type: Date,
    },
    paymentResult: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
)

//create a model
const Order = mongoose.model('Order', orderSchema)

export default Order
