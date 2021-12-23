import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { useNavigate } from 'react-router'
import Meta from '../components/Meta'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Message from '../components/Message'
import { saveReceiveInfo } from '../actions/cartActions'

const PickUpScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [pickUpName, setPickUpName] = useState(userInfo.name)
  const [pickUpPhoneNumber, setPickUpPhoneNumber] = useState(
    userInfo.phoneNumber
  )
  const now = new Date()
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    12
  )
  const [pickUpDate, setPickUpDate] = useState(tomorrow)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch(saveReceiveTime(pickUpDate))
    dispatch(saveReceiveInfo(pickUpName, pickUpPhoneNumber, pickUpDate))
    // dispatch(saveReceivePhoneNumber(pickUpPhoneNumber))
    navigate('/payment')
  }
  return (
    <>
      <Meta title='Check Out' />
      <FormContainer>
        <CheckOutSteps step1 step2 />
        <h1>Pick Up Info</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value={pickUpName}
              required
              onChange={(e) => setPickUpName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='phonenumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Phone Number'
              value={pickUpPhoneNumber}
              required
              onChange={(e) => setPickUpPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>Pick Up Date</Form.Label>
            <Form.Control
              //   type='date'
              as={DatePicker}
              //   placeholder='Select Pick Up Date'
              //   value={pickUpDate}
              minDate={tomorrow}
              selected={pickUpDate}
              showTimeSelect
              minTime={new Date(0, 0, 0, 12, 0)}
              maxTime={new Date(0, 0, 0, 19, 0)}
              timeFormat='HH:mm'
              dateFormat='h:mm aa, MM-dd-yyyy'
              required
              onChange={(date) => {
                setPickUpDate(date)
              }}
            >
              {/* <DatePicker /> */}
            </Form.Control>
            {pickUpDate.getDate() > 20 ||
              (pickUpDate.getDate() < 12 && (
                <Message variant='danger'>Invalid Pick Up time</Message>
              ))}
          </Form.Group>
          <Button type='submit' variant='primary' className='my-3'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PickUpScreen
