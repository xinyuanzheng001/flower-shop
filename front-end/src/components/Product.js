import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          // style={{ minHeight: '204px', maxHeight: '476px' }}
          // style={{ width: '100%', maxHeight: '100%' }}
        />
      </Link>

      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title as='div'>
            <strong>
              {' '}
              {product.name.length > 40
                ? `${product.name.substring(0, 35)}....`
                : product.name}{' '}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          {product.name.length <= 20 && <br />}
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
