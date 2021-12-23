import React, { useState } from 'react'
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

const NavigationBar = () => {
  const navigate = useNavigate()
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const [isOpenVip, setIsOpenVip] = useState(false)
  return (
    <>
      <Navbar
        variant='dark'
        style={{ backgroundColor: 'lightgreen', height: '20px' }}
        className='my-3'
        // bg='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          {/* <Navbar.Brand href='#home'>Navbar</Navbar.Brand> */}
          {/* <Navbar.Toggle className='ml-auto '></Navbar.Toggle> */}
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
                <NavDropdown.Item>red flower</NavDropdown.Item>
                <NavDropdown.Item>white flower</NavDropdown.Item>
                <NavDropdown.Item>yellow flower</NavDropdown.Item>
              </DropdownButton>
              <Button as={Link} to='/vip' style={{ background: 'none' }}>
                VIP
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
