import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, reviewProduct } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductScreen = () => {
  const { id } = useParams()
  // const [product, setProduct] = useState({})

  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)

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
    dispatch(listProductDetails(id))
  }, [dispatch, id, successReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(reviewProduct(id, { rating, comment }))
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
          <Meta title={product.name} />
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>{product.name}</ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className='font-weight-bold'>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>
                    Description:{' '}
                  </p>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col style={{ color: '#B12704', fontWeight: 'bold' }}>
                        ${product.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>QTY:</Col>
                      <Col>
                        <Form
                          as='input'
                          value={qty}
                          onChange={(e) =>
                            e.target.value > 0
                              ? setQty(e.target.value)
                              : setQty(1)
                          }
                        ></Form>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
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
                <ListGroup.Item>
                  <h2>Write a Review</h2>
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Sign In</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default ProductScreen
