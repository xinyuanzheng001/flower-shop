import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams, useNavigate } from 'react-router'
import { delieverOrder, getOrderDetail } from '../actions/orderActions'
import { ORDER_DELIEVERED_RESET } from '../constants/orderConstants'
import Meta from '../components/Meta'

const OrderEditScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showInfo, setShowInfo] = useState({})
  const orderDetail = useSelector((state) => state.orderDetail)
  const { order, loading, error } = orderDetail

  const orderDeliever = useSelector((state) => state.orderDeliever)
  const { success: successDeliever } = orderDeliever

  const orderListAdminAll = useSelector((state) => state.orderListAdminAll)
  const { page } = orderListAdminAll

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const admin = useSelector((state) => state.admin)
  const successDeliveredHandler = () => {
    dispatch(delieverOrder(order))
  }

  const showInfoHandler = (index) => {
    let show = {}
    order.orderItems.map((item) => (show[item._id] = false))
    setShowInfo(show)
    setShowInfo({ ...showInfo, [index]: !showInfo[index] })
    console.log(showInfo)
  }

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }
    if (!order || order._id !== id) {
      dispatch(getOrderDetail(id))
    } else {
      if (successDeliever) {
        dispatch(getOrderDetail(id))
        dispatch({ type: ORDER_DELIEVERED_RESET })
      }
    }
  }, [dispatch, order, id, successDeliever, userInfo, navigate])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title='Order Edit' />
      <Row>
        <Col md={8}>
          <Link
            onClick={() => navigate(-1)}
            to={`/admin/orders/${page}`}
            type='button'
            className='btn btn-light'
          >
            Go Back
          </Link>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
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
                    : 'Pick Up'}{' '}
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
              {/* {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
              )} */}
              {order.orderItems.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className='control'
                  style={{ border: 'none' }}
                >
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
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
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
              {!order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    variant='success'
                    className='btn-block'
                    onClick={successDeliveredHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderEditScreen
