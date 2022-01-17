import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

// @desc Fetch all categories
// @route       GET /api/category
// @access      Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
  res.json({ categories })
})

//@desc  Add new category
//@route        POST /api/category
//@access       Admin only
const addCategory = asyncHandler(async (req, res) => {
  const { category } = req.body
  const categoryExist = await Category.findOne({ category })
  if (categoryExist) {
    return
  }
  const newCategory = await Category.create({ category })
  if (newCategory) {
    res.status(201).json({
      category,
    })
  } else {
    res.status(400)
    throw new Error('Invalid category')
  }
})

//@desc     Update category
//@route    PUT /api/category
//@access   Admin only
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryList } = req.body
  const updatedCategoryList = await Category.findOne({})
  updatedCategoryList.categories =
    categoryList || updatedCategoryList.categories
  const category = await updatedCategoryList.save()
  res.json(category)
})
export { getCategories, addCategory, updateCategory }
