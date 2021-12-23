import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productListCategory = useSelector((state) => state.productListCategory)
  const { productCategory, success } = productListCategory
  const { categories } = productCategory
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }
  const profileHandler = () => {
    navigate('/profile')
  }
  const adminHandle = () => {
    navigate('/admin/users')
  }
  const productHandler = () => {
    navigate('/admin/products')
  }
  const orderHandler = () => {
    navigate('/admin/orders')
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Flower Shop
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            onClick={() => setIsOpen(!isOpen)}
          />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart' />
                Cart
              </Nav.Link>
              {userInfo ? (
                userInfo.isAdmin ? (
                  <>
                    <NavDropdown title='Admin' id='admin'>
                      <NavDropdown.Item onClick={adminHandle}>
                        Users
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={productHandler}>
                        Products
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={orderHandler}>
                        Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item onClick={profileHandler}>
                      Profile
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className='fas fa-user' />
                  Sign In
                </Nav.Link>
              )}
              <div className='dropdown-control'>
                <NavDropdown title='Category' id='category'>
                  {categories &&
                    categories.map((category) => (
                      <NavDropdown.Item key={category.id}>
                        {category.category}
                      </NavDropdown.Item>
                    ))}
                </NavDropdown>
                <Nav.Link as={Link} to='/vip'>
                  VIP
                </Nav.Link>
                <Nav.Link as={Link} to='/about'>
                  About Us
                </Nav.Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
