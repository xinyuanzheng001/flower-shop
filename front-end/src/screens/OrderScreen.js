import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router'
import { getOrderDetail, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import Meta from '../components/Meta'

const OrderScreen = () => {
  const [showInfo, setShowInfo] = useState({})
  const { id } = useParams()
  const dispatch = useDispatch()
  const orderDetail = useSelector((state) => state.orderDetail)
  const { order, loading, error } = orderDetail

  const orderPay = useSelector((state) => state.orderPay)
  const { success: successPay } = orderPay

  const admin = useSelector((state) => state.admin)

  const showInfoHandler = (index) => {
    let show = {}
    order.orderItems.map((item) => (show[item._id] = false))
    setShowInfo(show)
    setShowInfo({ ...showInfo, [index]: !showInfo[index] })
    console.log(showInfo)
  }

  // useEffect(() => {
  //   if (!order || order._id !== id) {
  //     dispatch(getOrderDetail(id))
  //   }
  // }, [dispatch, order, id])
  useEffect(() => {
    // const addPayPalScript = async () => {
    //   const { data: clientId } = await axios.get('/api/config/paypal')
    //   const script = document.createElement('script')
    //   script.type = 'text/javascript'
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //   script.async = true
    //   script.onload = () => {
    //     setSdkReady(true)
    //   }
    //   document.body.appendChild(script)
    // }

    // if (!order || successPay || order._id !== id) {
    //   dispatch(getOrderDetail(id))
    //   dispatch({ type: ORDER_PAY_RESET })
    // } else if (!order.isPaid) {
    //   if (!window.paypal) {
    //     addPayPalScript()
    //   } else {
    //     setSdkReady(true)
    //   }
    // }
    if (!order || order._id !== id) {
      dispatch(getOrderDetail(id))
    }
  }, [dispatch, id, order])
  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(id, paymentResult))
  // }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Row>
      <Meta title='Order' />
      <Col md={8}>
        <Link type='button' className='btn btn-light' to={'/profile'}>
          Go Back
        </Link>

        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>{order.receiverInfo.receiveMethod}</h2>
            <p>
              <strong>Name: </strong> {order.receiverInfo.name}
            </p>
            <p>
              <strong>Email: </strong>{' '}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>
                {order.receiverInfo.receiveMethod === 'Delivery'
                  ? ''
                  : 'Pick Up '}
                Address:
              </strong>
              {order.receiverInfo.receiveMethod === 'Delivery'
                ? (order.receiverInfo.address,
                  order.receiverInfo.city,
                  order.receiverInfo.postalCode)
                : admin.params.pickUpAddress}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>
                {order.receiverInfo.receiveMethod === 'Delivery'
                  ? 'Delivered'
                  : 'Pick Up'}{' '}
                on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>
                Not{' '}
                {order.receiverInfo.receiveMethod === 'Delivery'
                  ? 'Delivered'
                  : 'Pick Up'}
              </Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Your order is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index} className='control'>
                    <Row>
                      <Col md={2} sm={2} xs={2}>
                        <Image
                          src={item.primeImage}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col>
                        {/* <Link to={`/product/${item.product}`}>{item.name}</Link> */}
                        {item.name}
                      </Col>
                      <Col md={4} sm={4} xs={4}>
                        {item.qty} x ${item.qtyAmountPrice} = $
                        {(item.qty * item.qtyAmountPrice).toFixed(2)}
                      </Col>
                      <Col md={1} sm={1} xs={1}>
                        <i
                          className='fas fa-plus'
                          onClick={() => showInfoHandler(item._id)}
                        />
                      </Col>
                    </Row>
                    <div
                      style={{
                        display: showInfo[item._id] ? '' : 'none',
                        // transition: '1s',
                      }}
                      className='div-control'
                    >
                      <p>Flower Amount: {item.qtyAmount}</p>
                      <p>Color: {item.color}</p>
                      <p>Card Message: {item.cardMessage}</p>
                      <p>Special Instruction: {item.specialInstruction}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
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
                <Col>${order.itemPrice}</Col>
              </Row>
            </ListGroup.Item>
            {order.paymentMethod !== 'Cash' && (
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {/* {!order.isPaid && sdkReady && (
              <ListGroup.Item>
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              </ListGroup.Item>
            )} */}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default OrderScreen
