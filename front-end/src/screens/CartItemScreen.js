import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, reviewProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
import { addToCart } from '../actions/cartActions'

const CartItemScreen = () => {
  const { id } = useParams()
  // const [product, setProduct] = useState({})

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const itemDetail = cartItems[id]

  const navigate = useNavigate()
  const [qty, setQty] = useState(itemDetail.qty)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [showImage, setShowImage] = useState('')
  const [selectColor, setSelectColor] = useState(itemDetail.color)
  const [qtyAmount, setQtyAmount] = useState(itemDetail.qtyAmount)
  const [qtyAmountPrice, setQtyAmountPrice] = useState(
    itemDetail.qtyAmountPrice
  )
  const [price, setPrice] = useState(itemDetail.price)
  const [cardMessage, setCardMessage] = useState(itemDetail.cardMessage)
  const [specialInstruction, setSpecialInstruction] = useState(
    itemDetail.specialInstruction
  )

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productReview = useSelector((state) => state.productReview)
  const { success: successReview, error: errorReview } = productReview

  useEffect(() => {
    // const fetchProduct = async () => {
    // const { data } = await axios.get(`/api/products/${id}`)

    // setProduct(data)
    //   dispatch(listProductDetails(id))
    // }

    // fetchProduct()
    dispatch({ type: PRODUCT_REVIEW_RESET })
    if (successReview) {
      setRating(0)
      setComment('')
    }
    dispatch(listProductDetails(itemDetail.product))
  }, [dispatch, itemDetail.product, successReview])

  const addToCartHandler = () => {
    dispatch(
      addToCart(
        product._id,
        qty,
        selectColor,
        qtyAmount,
        qtyAmountPrice,
        price,
        cardMessage,
        specialInstruction
      )
    )
    // navigate(`/cart/${id}?qty=${qty}`)
    navigate('/cart')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(reviewProduct(id, { rating, comment }))
  }

  const changeImageHandler = (e) => {
    setShowImage(e.target.src)
  }

  const qtyAmountHandler = (e) => {
    setQtyAmount(e.target.value)
    const price = product.qtyOptions.filter(
      (option) => option.qty == e.target.value
    )
    if (price.length == 1) {
      setQtyAmountPrice(price[0].qtyPrice)
      setPrice(price[0].qtyPrice * qty)
    }
  }

  const qtyHandler = (e) => {
    setQty(e.target.value)
    setPrice(e.target.value * (qtyAmountPrice ? qtyAmountPrice : product.price))
  }
  return (
    <div>
      <Link className='btn btn-light my-3' onClick={() => navigate(-1)} to='/'>
        <strong>Go Back</strong>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={itemDetail.name} />
          <Row>
            <Col md={6}>
              <Image
                src={showImage ? showImage : itemDetail.primeImage}
                alt={itemDetail.name}
                style={{ width: '100%', maxHeight: '450px' }}
                fluid
              />
              <div
                className='my-3'
                style={{
                  display: 'flex',
                  // justifyContent: 'space-evenly',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {itemDetail.image &&
                  itemDetail.image.map((i, index) => (
                    <Image
                      src={i}
                      key={index}
                      onClick={changeImageHandler}
                      style={{
                        width: '15%',
                        // margin: '10px',
                        maxHeight: '70px',
                        // gap: '10px',
                        cursor: 'pointer',
                        // justifyContent: 'space-evenly',
                      }}
                    ></Image>
                  ))}
              </div>
            </Col>
            <Col md={6}>
              <Form onSubmit={addToCartHandler}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{itemDetail.name}</ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item className='font-weight-bold'>
                    Price: ${price ? price : itemDetail.price}
                  </ListGroup.Item>
                  {product.colorOptions && product.colorOptions.length !== 0 && (
                    <ListGroup.Item>
                      <Form.Group controlId='color' className='form-inline'>
                        <Form.Label>Color:</Form.Label>
                        <Form.Control
                          as='select'
                          value={selectColor}
                          onChange={(e) => setSelectColor(e.target.value)}
                          required
                          className='ml-auto'
                          // style={{ maxHeight: '15px' }}
                        >
                          <option value=''>Choose Color</option>
                          {product.colorOptions.map((color, index) => (
                            <option value={color.color} key={index}>
                              {color.color}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </ListGroup.Item>
                  )}
                  {product.qtyOptions && product.qtyOptions.length !== 0 && (
                    <ListGroup.Item>
                      <Form.Group controlId='qty' className='form-inline'>
                        <Form.Label>Flower Amount:</Form.Label>
                        <Form.Control
                          as='select'
                          value={qtyAmount}
                          onChange={qtyAmountHandler}
                          className='ml-auto'
                          required
                        >
                          <option value=''>Choose Amount</option>
                          {product.qtyOptions.map((option) => (
                            <option value={option.qty} key={option._id}>
                              {option.qty}朵 - ${option.qtyPrice}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Form.Group controlId='cardmessage'>
                      <Form.Label>Card Message: (optional)</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='4'
                        placeholder='Enter Card Message'
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group controlId='specialnote'>
                      <Form.Label>Special Instruction: (optional)</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='4'
                        placeholder='Enter Special Instruction'
                        value={specialInstruction}
                        onChange={(e) => setSpecialInstruction(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Form.Group controlId='qty' className='form-inline'>
                      <Form.Label>QTY:</Form.Label>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={qtyHandler}
                        className='ml-auto'
                        required
                      >
                        {[...Array(10).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='submit'
                      // onClick={addToCartHandler}
                    >
                      Update
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Form>
            </Col>

            <Col md={12}>
              <ListGroup.Item>
                <p style={{ margin: '0', fontWeight: 'bold' }}>Description: </p>
                {product.description}
              </ListGroup.Item>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default CartItemScreen
