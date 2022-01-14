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
  const navigate = useNavigate()
  const [receiveMethod, setReceiveMethod] = useState('')
  const [selectMethod, setSelectMethod] = useState(false)
  const [receiverName, setReceiverName] = useState('')
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState('')
  const [receiverAddress, setReceiverAddress] = useState('')
  const [receiverPostalCode, setReceiverPostalCode] = useState('')
  const [receiverCity, setReceiverCity] = useState('')

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
      // if (receiveMethod === 'Delivery') {
      //   navigate('/shipping')
      // } else {
      //   navigate('/pickup')
      // }
      navigate('/checkout')
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
              {cartItems.map((item, index) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.primeImage}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/cart/cartItem/${index}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.qtyAmountPrice}</Col>
                    <Col md={2}>
                      <Form
                        style={{ width: '50%', marginTop: '10px' }}
                        as='input'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(
                              item.product,
                              Number(e.target.value),
                              item.color,
                              item.qtyAmount,
                              item.qtyAmountPrice,
                              item.price,
                              item.cardMessage,
                              item.specialInstruction
                            )
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
                  Subtotal(
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                  items
                </h2>
              </ListGroup.Item>

              {cartItems.length > 0 && (
                <>
                  <ListGroup.Item>
                    <Row>
                      <Col>Subtotal: </Col>
                      <Col>
                        $
                        {cartItems
                          .reduce(
                            (acc, item) => acc + item.qty * item.qtyAmountPrice,
                            0
                          )
                          .toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </>
              )}

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  // disabled={cartItems.length === 0 || !selectMethod}
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
