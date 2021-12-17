import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { getAllOrdersList } from '../actions/orderActions'
import Meta from '../components/Meta'

const OrderListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const orderListAdminAll = useSelector((state) => state.orderListAdminAll)
  const { loading, error, ordersListDetail } = orderListAdminAll
  // const productUpdate = useSelector((state) => state.productUpdate)
  // const { success: successUpdate } = productUpdate
  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/')
    } else {
      dispatch(getAllOrdersList())
    }
  }, [dispatch, navigate, userInfo])
  return (
    <>
      <Meta title='Orders' />
      <Row>
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>CUSTOMER</th>
              <th>PRICE</th>
              <th>ORDER AT</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {ordersListDetail.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>${order.totalPrice}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className='fas fa-times center'
                      style={{ color: 'red' }}
                    />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/admin/orders/${order._id}/edit`}
                    variant='light'
                    className='btn btn-block'
                    type='button'
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
