import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { useNavigate } from 'react-router'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const [paymentMethod, setPaymentMethod] = useState('')
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Label as='legend'>Select Method</Form.Label>
        <Form.Group>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              value='PayPal'
              name='paymentMethod'
              id='PayPal'
              // checked
              onClick={(e) => {
                setPaymentMethod(e.target.value)
                setSelectPaymentMethod(true)
              }}
            />
            <Form.Check
              type='radio'
              label='Cash'
              value='Cash'
              name='paymentMethod'
              id='cash'
              // checked
              onClick={(e) => {
                setPaymentMethod(e.target.value)
                setSelectPaymentMethod(true)
              }}
            />
          </Col>
        </Form.Group>

        <Button
          type='submit'
          variant='primary'
          className='my-3'
          disabled={!selectPaymentMethod}
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
