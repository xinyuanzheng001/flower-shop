import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { topRatedProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const [bgColor, setBgColor] = useState('lightblue')
  const [contentColor, setContentColor] = useState('black')
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
    <>
      <input
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        className='my-3 mr-3'
      ></input>
      <input
        value={contentColor}
        onChange={(e) => setContentColor(e.target.value)}
      ></input>
      <Carousel
        pause='hover'
        // className='bg-dark'
        indicators={false}
        prevLabel=''
        nextLabel=''
        style={{ backgroundColor: 'white' }}
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
                <h3 style={{ color: contentColor }}>{product.name}</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default ProductCarousel
