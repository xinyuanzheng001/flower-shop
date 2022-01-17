import React, { useState, useEffect } from 'react'
import {
  Navbar,
  Nav,
  Container,
  DropdownButton,
  Button,
  NavDropdown,
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { listProductCategory } from '../actions/productActions'
import { getParams } from '../actions/adminAction'

const NavigationBar = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const productListCategory = useSelector((state) => state.productListCategory)
  const { productCategory } = productListCategory
  const { categories } = productCategory
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [bgColor, setBgColor] = useState('rgb(220,220,220)')
  const [contentColor, setContentColor] = useState('black')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listProductCategory())
  }, [dispatch])
  return (
    <>
      <Navbar
        // variant='dark'
        style={{ backgroundColor: bgColor, height: '20px' }}
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
                    <NavDropdown.Item
                      key={category.id}
                      as={Link}
                      to={`/${category.category}`}
                    >
                      {category.category}
                    </NavDropdown.Item>
                  ))}
              </DropdownButton>
              <Button
                as={Link}
                to='/vip'
                style={{
                  background: 'none',
                  fontSize: 'large',
                  color: contentColor,
                }}
              >
                VIP
              </Button>
              <Button
                as={Link}
                to='/about'
                style={{
                  background: 'none',
                  fontSize: 'large',
                  color: contentColor,
                }}
              >
                About Us
              </Button>
              <input
                value={bgColor}
                placeholder='Enter Background Color'
                onChange={(e) => setBgColor(e.target.value)}
                className='ml-3 mr-3'
              ></input>
              <input
                value={contentColor}
                placeholder='Enter content color'
                onChange={(e) => setContentColor(e.target.value)}
              ></input>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
