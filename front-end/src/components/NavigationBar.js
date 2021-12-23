import React, { useState, useEffect } from 'react'
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  DropdownButton,
  Button,
  NavDropdown,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { listProductCategory } from '../actions/productActions'

const NavigationBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productListCategory = useSelector((state) => state.productListCategory)
  const { productCategory, success } = productListCategory
  const { categories } = productCategory
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  useEffect(() => {
    if (!success) {
      dispatch(listProductCategory())
    }
  }, [dispatch, success])
  return (
    <>
      <Navbar
        variant='dark'
        style={{ backgroundColor: 'lightgreen', height: '20px' }}
        className='my-3'
        id='navbar-control'
        // bg='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          {/* <Navbar.Brand href='#home'>Navbar</Navbar.Brand> */}
          <Navbar.Toggle className='ml-auto '></Navbar.Toggle>
          <Navbar.Collapse>
            <Nav>
              {/* <Nav.Link as={Link} to='/' style={{ background: 'none' }}>
                Home
              </Nav.Link> */}
              <DropdownButton
                title='Category'
                id='dropdown-item-button'
                show={isOpenCategory}
                onMouseEnter={() => setIsOpenCategory(true)}
                onMouseLeave={() => setIsOpenCategory(false)}
                onClick={() => setIsOpenCategory(!isOpenCategory)}
              >
                {categories &&
                  categories.map((category) => (
                    <NavDropdown.Item key={category.id}>
                      {category.category}
                    </NavDropdown.Item>
                  ))}
              </DropdownButton>
              <Button
                as={Link}
                to='/vip'
                style={{ background: 'none', fontSize: 'large' }}
              >
                VIP
              </Button>
              <Button
                as={Link}
                to='/about'
                style={{ background: 'none', fontSize: 'large' }}
              >
                About Us
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
