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
    }
  }, [dispatch, params, success])

  const submitHandler = () => {
    dispatch(updateParams({ taxRate, deliveryCharge, discount }))
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
          <Form.Group controlId='deliverArea' className='form-inline mb-3'>
            <Form.Label>Delivery Area:</Form.Label>
            <p style={{ marginLeft: 'auto', maxWidth: '218px' }}>
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
