import React from 'react'
import { Navbar,Container,Nav, Badge } from "react-bootstrap";
import { FaShoppingCart,FaUser } from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';

const Header = () => {
  /*
  How can you select any data from your global state?
  useSelector() is a hook that allow you to select anything you want from your global state.
  And it doesn't matter which slice it is or what part of your state it is.
  */
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
                <img src={logo} alt='ProShop' />
                ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>  
              <LinkContainer to='/login'>
                <Nav.Link>
                    <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>  
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
