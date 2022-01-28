import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { saveReceiverInfo } from '../actions/cartActions'
import { useParams, useNavigate } from 'react-router-dom'
import Meta from '../components/Meta'
import DatePicker from 'react-datepicker'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { createOrder, payOrder } from '../actions/orderActions'
import emailjs from 'emailjs-com'
import { updateProduct } from '../actions/productActions'
const CheckOutScreen = () => {
  const navigate = useNavigate()
  const [receiveMethod, setReceiveMethod] = useState('')
  const [selectMethod, setSelectMethod] = useState(false)
  const [receiverName, setReceiverName] = useState('')
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('')
  const [receiverAddress, setReceiverAddress] = useState('')
  const [receiverPostalCode, setReceiverPostalCode] = useState('')
  const [receiverCity, setReceiverCity] = useState('')
  const [sdkReady, setSdkReady] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const [showPaymentInfo, setShowPaymentInfo] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const now = new Date()
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    12
  )

  const [receiveDate, setReceiveDate] = useState(tomorrow)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (id) {
  //     dispatch(addToCart(id, qty))
  //   }
  // }, [dispatch, id, qty])

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const admin = useSelector((state) => state.admin)
  const { params } = admin
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&disable-funding=credit`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    addPayPalScript()
    if (success) {
      navigate(`/order/${order._id}`)
      const from_name = 'Flower Shop'
      const to_name = 'Feya'
      const message = `You have received a new order`
      const sendEmail = () => {
        emailjs
          .send(
            'service_w9mh7jk',
            'template_86lhowb',
            { from_name, to_name, message },
            'user_kIF0CQauzGKwMyOtBtC54'
          )
          .then(
            (result) => {
              console.log(result.text)
            },
            (error) => {
              console.log(error.text)
            }
          )
      }
      sendEmail()
    }
  }, [dispatch, success, navigate])

  cart.itemPrice = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2)
  cart.taxPrice = Number((cart.itemPrice * params.taxRate) / 100).toFixed(2)
  cart.shippingPrice =
    receiveMethod === 'Delivery' ? params.deliveryCharge.toFixed(2) : 0
  cart.totalPrice = (
    Number(cart.itemPrice) +
    Number(cart.taxPrice) +
    Number(cart.shippingPrice)
  ).toFixed(2)

  const createOrderHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveReceiverInfo({
        name: receiverName,
        phoneNumber: receiverPhoneNumber,
        address: receiverAddress,
        city: receiverCity,
        postalCode: receiverPostalCode,
        receiveDate,
        receiveMethod,
      })
    )
    setShowInfo(false)
    setShowPaymentInfo(true)
    setShowPayment(true)
  }
  const successPaidHandler = (paymentResult) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        receiverInfo: cart.receiverInfo,
        paymentMethod: 'PayPal',
        receiveMethod: receiveMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        isPaid: true,
        paidAt: Date.now(),
        paymentResult,
        cardMessage: cart.cardMessage,
        specialInstruction: cart.specialInstruction,
      })
    )
    cart.cartItems.map((item) =>
      item.addCountInStock === true
        ? dispatch(
            updateProduct({
              id: item.product,
              countInStock: Number(item.countInStock) - Number(item.qty),
              addCountInStock: true,
            })
          )
        : ''
    )
  }

  return (
    <>
      <Meta title='Check Out' />
      <Row>
        <Col lg={7} md={12}>
          <h1>Check Out</h1>
          <ListGroup.Item style={{ borderLeft: 'none', borderRight: 'none' }}>
            <Form>
              <Form.Check
                type='radio'
                label='Pick Up'
                value='Pick Up'
                name='receiveMethod'
                id='PickUp'
                onClick={(e) => {
                  setReceiveMethod('Pick Up')
                  setSelectMethod(true)
                }}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Delivery'
                value='Delivery'
                name='receiveMethod'
                id='Delivery'
                // checked
                onClick={(e) => {
                  setReceiveMethod('Delivery')
                  setSelectMethod(true)
                }}
              ></Form.Check>
            </Form>
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              display: receiveMethod ? 'block' : 'none',
              borderLeft: 'none',
              borderRight: 'none',
            }}
          >
            <div className='form-inline'>
              <h3>
                {receiveMethod === 'Delivery'
                  ? 'Delivery Info'
                  : 'Pick Up Info'}
              </h3>
              <i
                className='fas fa-minus ml-auto'
                onClick={(e) => setShowInfo(!showInfo)}
              />
            </div>
            <Form
              onSubmit={createOrderHandler}
              style={{ display: showInfo ? '' : 'none' }}
              //   style={{ display: 'none' }}
            >
              <Form.Group controlId='receiverName'>
                <Form.Label>
                  {receiveMethod === 'Delivery' ? "Receiver's" : 'Pick Up'}{' '}
                  Name:
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder=''
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='receiverName'>
                <Form.Label>
                  {receiveMethod === 'Delivery' ? "Receiver's" : 'Pick Up'}{' '}
                  Phone Number:
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder=''
                  value={receiverPhoneNumber}
                  onChange={(e) => setReceiverPhoneNumber(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group
                controlId='address'
                style={{ display: receiveMethod === 'Delivery' ? '' : 'none' }}
              >
                <Form.Label>Receiver's Address:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter Receiver's Address"
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value)}
                  required={receiveMethod === 'Delivery' ? true : false}
                ></Form.Control>
              </Form.Group>
              <Form.Group
                controlId='postalcode'
                style={{ display: receiveMethod === 'Delivery' ? '' : 'none' }}
              >
                <Form.Label>Receiver's Zip Code:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter Receiver's Zip Code"
                  value={receiverPostalCode}
                  onChange={(e) => setReceiverPostalCode(e.target.value)}
                  required={receiveMethod === 'Delivery' ? true : false}
                ></Form.Control>
              </Form.Group>
              <Form.Group
                controlId='city'
                style={{ display: receiveMethod === 'Delivery' ? '' : 'none' }}
              >
                <Form.Label>Receiver's City:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter Receiver's City"
                  value={receiverCity}
                  onChange={(e) => setReceiverCity(e.target.value)}
                  required={receiveMethod === 'Delivery' ? true : false}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='deliveryDate'>
                <Form.Label>
                  {receiveMethod === 'Delivery' ? 'Delivery' : 'Pick Up'} Date:
                </Form.Label>
                <Form.Control
                  as={DatePicker}
                  minDate={tomorrow}
                  selected={receiveDate}
                  showTimeSelect
                  minTime={new Date(0, 0, 0, 12, 0)}
                  maxTime={new Date(0, 0, 0, 19, 0)}
                  timeFormat='HH:mm'
                  dateFormat='h:mm aa, MM-dd-yyyy'
                  required
                  onChange={(date) => {
                    setReceiveDate(date)
                  }}
                  className='mb-3'
                ></Form.Control>
              </Form.Group>
              <Button type='submit'>Continue</Button>
            </Form>
          </ListGroup.Item>
          <ListGroup.Item
            style={{
              borderLeft: 'none',
              borderRight: 'none',
              display: showPayment ? '' : 'none',
            }}
          >
            <div className='form-inline'>
              <h3>Payment</h3>
              <i
                className='fas fa-minus ml-auto'
                onClick={(e) => setShowPaymentInfo(!showPaymentInfo)}
              />
            </div>
            <div style={{ display: showPaymentInfo ? '' : 'none' }}>
              <PayPalButton
                amount={cart.totalPrice}
                onSuccess={successPaidHandler}
              />
            </div>
          </ListGroup.Item>
        </Col>
        <Col lg={5} md={12}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>$
                {cartItems
                  .reduce(
                    (acc, item) => acc + item.qty * item.qtyAmountPrice,
                    0
                  )
                  .toFixed(2)}
              </ListGroup.Item>
              <p className='ml-4 my-4'>{cartItems.length} Items</p>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={3} sm={3} xs={3}>
                      <Image src={item.primeImage} alt={item.name} fluid />
                    </Col>
                    <Col md={6} sm={6} xs={6}>
                      <p>
                        {item.qty} x {item.name}
                      </p>
                      {item.color && <span>{item.color}</span>} <br></br>
                      {item.qtyAmount && <span>{item.qtyAmount}朵</span>}
                    </Col>
                    <Col md={3} sm={3} xs={3} className='ml-auto'>
                      <p>${item.qtyAmountPrice}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <Row>
                  <Col>Subtotal:</Col>
                  <Col md={3} sm={3} xs={3}>
                    ${cart.itemPrice}
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col>Shipping:</Col>
                  <Col md={3} sm={3} xs={3}>
                    ${cart.shippingPrice}
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col>Tax:</Col>
                  <Col md={3} sm={3} xs={3}>
                    ${cart.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h3>Total: </h3>
                  </Col>
                  <Col>
                    <h3>${cart.totalPrice}</h3>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CheckOutScreen
