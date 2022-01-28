import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductEditScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState([])
  const [primeImage, setPrimeImage] = useState('')
  const [vip, setVip] = useState(false)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [qty, setQty] = useState(0)
  const [qtyPrice, setQtyPrice] = useState(0)
  const [showQty, setShowQty] = useState('')
  const [qtyOptions, setQtyOptions] = useState([])
  const [color, setColor] = useState('')
  const [showColor, setShowColor] = useState('')
  const [colorOptions, setColorOptions] = useState([])
  const [addCountInStock, setAddCountInStock] = useState(false)
  const [countInStock, setCountInStock] = useState(0)
  const navigate = useNavigate()
  const { id } = useParams()

  const dispatch = useDispatch()

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  // const { success } = userUpdateProfile

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { success } = productUpdate

  const productListCategory = useSelector((state) => state.productListCategory)
  const { productCategory } = productListCategory

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch(listProductDetails(id))
      navigate('/admin/products')
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setCategory(product.category)
        setDescription(product.description)
        setQtyOptions(product.qtyOptions)
        setColorOptions(product.colorOptions)
        setPrimeImage(product.primeImage)
        setVip(product.vip)
        setAddCountInStock(product.addCountInStock)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, navigate, id, product, success])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(image)
    dispatch(
      updateProduct({
        id,
        name,
        price,
        image,
        category,
        description,
        qtyOptions,
        colorOptions,
        primeImage,
        vip,
        addCountInStock,
        countInStock,
      })
    )
  }
  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    if (e.target.files.length === 1) {
      const file = e.target.files[0]
      formData.append('image', file)
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]
        formData.append('image', file)
      }
    }
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      const imageList = []
      data.map((d) => imageList.push('/'.concat(d.path)))
      setImage(imageList)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const addOptionHandler = () => {
    setQtyOptions((qtyOptions) => [...qtyOptions, { qty, qtyPrice }])
    setQty('')
    setQtyPrice('')
    console.log(qtyOptions)
  }
  const deleteQtyHandler = () => {
    setQtyOptions(qtyOptions.filter((option) => option.qty !== showQty))
    if (qtyOptions.length >= 1) {
      setShowQty(qtyOptions[0].qty)
    }
  }
  const addColorHandler = () => {
    setColorOptions((colorOptions) => [...colorOptions, { color }])
    setColor('')
  }
  const deleteColorHandler = () => {
    setColorOptions(colorOptions.filter((option) => option.color !== showColor))
    if (colorOptions.length >= 1) {
      setShowColor(colorOptions[0].color)
    }
  }
  return (
    <>
      <Meta title='Product Edit' />
      <Link to='/admin/products' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            {/* <Form.Control
              type='text'
              placeholder='Enter image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control> */}
            <Form.Control
              // id='image-file'
              // type='file'
              type='file'
              lable='Choose File'
              multiple
              // custom
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}
          </Form.Group>
          <Form.Group controlId='primeimage'>
            <Form.Label>Select Prime Image</Form.Label>
            <Form.Control
              as='select'
              value={primeImage}
              onChange={(e) => setPrimeImage(e.target.value)}
              required={true}
            >
              <option value=''>Choose Prime Image</option>
              {image.map((i, index) => (
                <option value={i} key={index}>
                  {i}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as='select'
              value={category}
              required
              placeholder='dasdsad'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value=''>Choose Category</option>
              {productCategory &&
                productCategory.map((category) => (
                  <option value={category.category} key={category._id}>
                    {category.category}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter description'
              row='3'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='qtyoption'>
            <Form.Label>QTY Options</Form.Label>
            <div className='form-inline'>
              <Form.Control
                as='select'
                value={showQty}
                onChange={(e) => setShowQty(e.target.value)}
                style={{ width: '50%' }}
              >
                {qtyOptions.map((option, index) => (
                  <option value={option.qty} key={index}>
                    {option.qty}朵 - ${option.qtyPrice}
                  </option>
                ))}
              </Form.Control>
              <i
                className='fas fa-times ml-3'
                style={{ color: 'red' }}
                onClick={deleteQtyHandler}
              ></i>
            </div>
          </Form.Group>
          <Form.Group controlId='addqtyoption'>
            <Form.Label>Add QTY Options</Form.Label>
            <div className='form-inline'>
              <Form.Control
                type='number'
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                style={{ width: '35%', marginRight: '5px' }}
              ></Form.Control>
              <Form.Control
                type='number'
                value={qtyPrice}
                onChange={(e) => setQtyPrice(e.target.value)}
                style={{ width: '35%' }}
              ></Form.Control>
              <i
                className='fas fa-plus ml-3'
                style={{ color: 'green' }}
                onClick={addOptionHandler}
              ></i>
            </div>
          </Form.Group>
          <Form.Group controlId='colorOption'>
            <Form.Label>Color Options</Form.Label>
            <div className='form-inline'>
              <Form.Control
                as='select'
                value={showColor}
                onChange={(e) => setShowColor(e.target.value)}
                style={{ width: '50%' }}
              >
                {colorOptions.map((color, index) => (
                  <option key={index} value={color.color}>
                    {color.color}
                  </option>
                ))}
              </Form.Control>
              <i
                className='fas fa-times ml-3'
                style={{ color: 'red' }}
                onClick={deleteColorHandler}
              ></i>
            </div>
          </Form.Group>
          <Form.Group controlId='addcoloroption'>
            <Form.Label>Add Color Options</Form.Label>
            <div className='form-inline'>
              <Form.Control
                type='text'
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: '50%' }}
              ></Form.Control>
              <i
                className='fas fa-plus ml-3'
                style={{ color: 'green' }}
                onClick={addColorHandler}
              ></i>
            </div>
          </Form.Group>

          <Form.Group controlId='count'>
            <Form.Check
              type='checkbox'
              label='Add Count In Stock'
              className='my-3'
              checked={addCountInStock}
              onChange={(e) => setAddCountInStock(e.target.checked)}
            ></Form.Check>
            <div style={{ display: addCountInStock ? '' : 'none' }}>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </div>
          </Form.Group>
          {/* <Form.Group controlId='vip'>
            <Form.Check
              type='checkbox'
              label='For VIP?'
              checked={vip}
              onChange={(e) => setVip(e.target.checked)}
            ></Form.Check>
          </Form.Group> */}

          <Button type='submit' variant='primary' className='my-3'>
            Edit
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
