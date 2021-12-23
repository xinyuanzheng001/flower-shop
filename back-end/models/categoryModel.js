import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
