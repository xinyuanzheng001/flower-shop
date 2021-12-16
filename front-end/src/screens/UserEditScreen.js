import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserDetail, updateUserByAdmin } from '../actions/userActions'
import { getUserOrderList } from '../actions/orderActions'
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const dispatch = useDispatch()

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  // const { success } = userUpdateProfile

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate

  const orderListAdmin = useSelector((state) => state.orderListAdmin)
  const {
    loading: loadingOrder,
    error: errorOrder,
    orderListDetail,
  } = orderListAdmin

  useEffect(() => {
    if (success) {
      dispatch({
        type: USER_UPDATE_ADMIN_RESET,
      })
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserOrderList(id))
        dispatch(getUserDetail(id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, navigate, userInfo, user, id, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUserByAdmin({ id, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row>
        <Col md={3}>
          <h1>User Profile</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          {success && <Message variant='success'>Profile Updated</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                //   placeholder={user.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                //   placeholder={user.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>User Orders</h2>
          {loadingOrder ? (
            <Loader />
          ) : errorOrder ? (
            <Message variant='danger'>{errorOrder}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderListDetail.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }} />
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
                        to={`/order/${order._id}`}
                        className='btn-sm btn-light'
                      >
                        Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default UserEditScreen
