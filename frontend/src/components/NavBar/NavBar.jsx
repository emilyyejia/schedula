import { NavLink, Link, useNavigate } from 'react-router';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logOut } from '../../services/authService';
import './NavBar.css';
import { useState } from 'react';

export default function NavBar({ user }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  function handleMenu() {
    setExpanded(false);
  }
  function handleLogOut() {
    logOut();
    setUser(null);
    // navigate('/') not working; 
    // The<Link> that was clicked will navigate to '/'
    // Due to async issues

  }
  return (
    
    <Navbar expand={false} expanded={expanded} onToggle={setExpanded} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="my-navbar-brand">Schedula</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapsed-navbar" />
        <Navbar.Collapse id="collapsed-navbar">
          <Nav align="end" onClick={handleMenu}>
            {user ? (
              <>
                <span className="navbar-text">Welcome, {user.name}</span>
                <Nav.Link as={NavLink} to="/posts">Post List</Nav.Link>
                <Nav.Link as={NavLink} to="/posts/new">New Post</Nav.Link>
                <Nav.Link as={NavLink} to="/" onClick={handleLogOut}>Log Out</Nav.Link>

              </>
            ) : (
              <>
           
                <Nav.Link as={NavLink} to="/login">Log In</Nav.Link>
                <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}