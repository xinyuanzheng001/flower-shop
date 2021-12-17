import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pageNumber } = useParams() || 1
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productDelete = useSelector((state) => state.productDelete)
  const { success: successDelete } = productDelete
  const productCreate = useSelector((state) => state.productCreate)
  const { success: successCreate, product: createdProduct } = productCreate
  const productList = useSelector((state) => state.productList)
  const { products, loading, error, pages, page } = productList
  // const productUpdate = useSelector((state) => state.productUpdate)
  // const { success: successUpdate } = productUpdate
  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure want to delete ${name}`)) {
      dispatch(deleteProduct(id))
    }
  }
  const createProductHandler = () => {
    dispatch(createProduct())
  }
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      navigate('/')
    }
    if (successCreate) {
      navigate(`/admin/products/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    navigate,
    successDelete,
    successCreate,
    userInfo,
    createdProduct,
    pageNumber,
  ])
  return (
    <>
      <Meta title='Products' />
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='btn-dark' onClick={createProductHandler}>
            <i className='fas fa-plus'> </i>
            Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>RATING</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.rating}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/products/${product._id}/edit`}
                      variant='light'
                      className='btn-sm'
                    >
                      <i className='fas fa-edit' />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id, product.name)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
