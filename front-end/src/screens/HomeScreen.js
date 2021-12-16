import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
const HomeScreen = () => {
  const dispatch = useDispatch()
  const { keyword } = useParams()
  const { pageNumber } = useParams() || 1
  const productList = useSelector((state) => state.productList)

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
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div>
      <Meta />
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
      {/* //   <Row>
    //     {products.map((product) => (
    //       <Col sm={12} md={6} lg={4} xl={3}>
    //         <Product product={product} />
    //       </Col>
    //     ))}
    //   </Row> */}
    </div>
  )
}

export default HomeScreen