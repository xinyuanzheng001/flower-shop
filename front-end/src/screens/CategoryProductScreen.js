import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listCategoryProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CategoryPaginate from '../components/CategoryPaginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
const CategoryProductScreen = () => {
  const dispatch = useDispatch()
  const { category } = useParams()
  const { pageNumber } = useParams() || 1
  const productListWithCategory = useSelector(
    (state) => state.productListWithCategory
  )

  //grab states
  const { loading, error, products, pages, page } = productListWithCategory
  // useEffect(() => {
  //     const fetchProducts = async () => {
  //         const { data } = await axios.get('/api/products')

  //         setProducts(data)
  //     }
  //     fetchProducts()
  // }, [])
  useEffect(() => {
    dispatch(listCategoryProducts(pageNumber, category))
    // console.log(category.replace(/\s+/g, ''))
  }, [dispatch, pageNumber, category])

  return (
    <div>
      <Meta title={`${category}`} />
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
          <CategoryPaginate category={category} pages={pages} page={page} />
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

export default CategoryProductScreen
