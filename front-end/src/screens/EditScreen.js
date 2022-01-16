import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { getParams, updateParams } from '../actions/adminAction'
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader'

const EditScreen = () => {
  const [taxRate, setTaxRate] = useState(0)
  const [deliveryCharge, setDeliveryCharge] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [pickUpAddress, setPickUpAddress] = useState('')
  const [category, setCategory] = useState('')
  const [showCategory, setShowCategory] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const admin = useSelector((state) => state.admin)
  const { loading, error, params } = admin
  const adminUpdateParams = useSelector((state) => state.adminUpdateParams)
  const { success } = adminUpdateParams

  useEffect(() => {
    if (!params) {
      dispatch(getParams())
    } else {
      setTaxRate(params.taxRate)
      setDeliveryCharge(params.deliveryCharge)
      setDiscount(params.discount)
      setPickUpAddress(params.pickUpAddress)
      setCategoryList(params.categoryList)
    }
  }, [dispatch, params, success])

  const deleteCategoryHandler = () => {
    setCategoryList(categoryList.filter((c) => c !== showCategory))
    if (categoryList.length >= 1) {
      setShowCategory(categoryList[0])
    }
  }
  const addCategoryHandler = () => {
    setCategoryList((categoryList) => [...categoryList, { category }])
    setCategory('')
  }

  const submitHandler = () => {
    dispatch(
      updateParams({
        taxRate,
        deliveryCharge,
        discount,
        pickUpAddress,
        categoryList,
      })
    )
    navigate('/')
  }

  return (
    <>
      <Link
        type='button'
        className='btn btn-light'
        onClick={() => navigate(-1)}
        to={'/'}
      >
        Go Back
      </Link>
      <FormContainer>
        <Meta title='Edit Params' />
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='taxrate' className='form-inline mb-3'>
            <Form.Label>Tax Rate:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Tax Rate'
              value={taxRate}
              style={{ marginLeft: 'auto' }}
              onChange={(e) => setTaxRate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='deliverycharge' className='form-inline mb-3'>
            <Form.Label>Delivery Charge:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Delivery Charge'
              value={deliveryCharge}
              style={{ marginLeft: 'auto' }}
              onChange={(e) => setDeliveryCharge(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='discount' className='form-inline mb-3'>
            <Form.Label>Discount:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Discount'
              value={discount}
              style={{ marginLeft: 'auto' }}
              onChange={(e) => setDiscount(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='pickupaddress' className='form-inline mb-3'>
            <Form.Label>Pick Up Address:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Pick Up Address'
              style={{ marginLeft: 'auto' }}
              value={pickUpAddress}
              onChange={(e) => setPickUpAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category' className='form-inline mb-3'>
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as='select'
              style={{ marginLeft: 'auto' }}
              value={showCategory}
              onChange={(e) => setShowCategory(e.target.value)}
            >
              {categoryList.map((c, index) => (
                <option key={index} value={c.category}>
                  {c.category}
                </option>
              ))}
            </Form.Control>
            <i
              className='fas fa-times ml-3'
              style={{ color: 'red' }}
              onClick={deleteCategoryHandler}
            ></i>
          </Form.Group>
          <Form.Group controlId='addCategory' className='form-inline mb-3'>
            <Form.Label>Add Category:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter New Category'
              style={{ marginLeft: 'auto' }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
            <i
              className='fas fa-plus ml-3'
              style={{ color: 'green' }}
              onClick={addCategoryHandler}
            ></i>
          </Form.Group>

          <Form.Group controlId='deliverArea' className='form-inline mb-3'>
            <Form.Label>Delivery Area:</Form.Label>
            <p style={{ marginLeft: 'auto', maxWidth: '218 px' }}>
              Quincy, Boston, Reading, Braintree, North Quincy, Newton, Milton,
              North Reading, Lynnfield, Wakefield
            </p>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-3'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default EditScreen
