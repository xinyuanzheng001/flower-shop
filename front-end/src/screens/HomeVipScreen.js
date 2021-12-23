import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listVipProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
const HomeVipScreen = () => {
  const dispatch = useDispatch()
  const { pageNumber } = useParams() || 1
  const productList = useSelector((state) => state.productListVip)

  //grab states
  const { loading, error, products, pages, page } = productList
  // useEffect(() => {
  //     const fetchProducts = async () => {
  //         const { data } = await axios.get('/api/products')

  //         setProducts(data)
  //     }
  //     fetchProducts()
  // }, [])
  useEffect(() => {
    dispatch(listVipProducts(pageNumber))
  }, [dispatch, pageNumber])

  return (
    <div>
      <Meta title='Vip Products' />
      <ProductCarousel />
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col
                sm={12}
                md={6}
                lg={4}
                xl={3}
                key={product._id}
                className='align-items-stretch d-flex'
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </>
      )}
    </div>
  )
}

export default HomeVipScreen
