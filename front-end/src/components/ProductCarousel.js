import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { topRatedProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(topRatedProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      pause='hover'
      className='bg-dark'
      indicators={false}
      prevLabel=''
      nextLabel=''
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.primeImage}
              alt={product.name}
              fluid
              className='img-control'
              style={{ marginBottom: '10px' }}
            />
            <Carousel.Caption className='carousel-caption'>
              <h3>{product.name}</h3>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
