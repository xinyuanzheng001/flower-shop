import React, { useEffect } from 'react'
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
  const orderDetail = useSelector((state) => state.orderDetail)
  const { order, loading, error } = orderDetail

  const orderDeliever = useSelector((state) => state.orderDeliever)
  const { success: successDeliever } = orderDeliever

  const orderListAdminAll = useSelector((state) => state.orderListAdminAll)
  const { page } = orderListAdminAll

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const successDeliveredHandler = () => {
    dispatch(delieverOrder(order))
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
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
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
