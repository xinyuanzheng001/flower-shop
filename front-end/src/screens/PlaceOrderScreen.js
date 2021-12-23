import React, { useEffect, useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from '../components/CheckOutSteps'
import Message from '../components/Message'
import { useNavigate } from 'react-router'
import { createOrder } from '../actions/orderActions'
import emailjs from 'emailjs-com'

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart)
  const [cardMessage, setCardMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  cart.itemPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)
  cart.shippingPrice = (0).toFixed(2)
  cart.taxPrice = Number(cart.itemPrice * 0.15).toFixed(2)
  cart.totalPrice = (
    Number(cart.itemPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  useEffect(() => {
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
    // eslint-disable-next-line
  }, [navigate, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        receiveMethod: cart.receiveMethod,
        receiveName: cart.receiveName,
        receivePhoneNumber: cart.receivePhoneNumber,
        receiveTime: cart.receiveTime,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {cart.receiveMethod === 'Delivery' ? (
                <>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Shipping Address:</strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode}
                  </p>
                </>
              ) : (
                <>
                  <h2>Pick Up</h2>
                  <p>Pick Up Name: {cart.receiveName}</p>
                  <p>
                    <strong>Pick Up Address:</strong>
                    10 main st, Braintree
                  </p>
                  <p>
                    Pick Up Time: {cart.receiveTime.toString().substring(0, 16)}
                  </p>
                </>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Card Messages</h2>
              <Form.Control
                as='textarea'
                row='4'
                placeholder='Enter card messages'
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
              ></Form.Control>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error} </Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={placeOrderHandler}
                >
                  Plcae Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
