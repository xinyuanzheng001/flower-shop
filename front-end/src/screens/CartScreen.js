import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  addToCart,
  removeFromCart,
  saveReceiveMethod,
} from '../actions/cartActions'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { goToShipping } from '../actions/goToShipping'
import Meta from '../components/Meta'

const CartScreen = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const [receiveMethod, setReceiveMethod] = useState('')
  const [selectMethod, setSelectMethod] = useState(false)

  const qtn = useLocation().search

  const qty = qtn ? Number(qtn.split('=')[1]) : 1

  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const removeFromCartHandler = (productID) => {
    dispatch(removeFromCart(productID))
  }

  const checkOutHandler = () => {
    dispatch(saveReceiveMethod(receiveMethod))
    if (userInfo) {
      if (receiveMethod === 'Delivery') {
        navigate('/shipping')
      } else {
        navigate('/pickup')
      }
    } else {
      dispatch(goToShipping())
      navigate('/login')
    }
    // navigate('/login?goto=shipping')
  }

  return (
    <>
      <Meta title='Cart' />
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form
                        style={{ width: '50%', marginTop: '10px' }}
                        as='input'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      ></Form>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={(e) => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              {cartItems.length !== 0 && (
                <ListGroup.Item>
                  <Form>
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
                  </Form>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0 || !selectMethod}
                  onClick={checkOutHandler}
                >
                  Check Out
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
