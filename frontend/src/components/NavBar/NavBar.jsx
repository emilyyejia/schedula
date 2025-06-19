import { NavLink, Link, useNavigate } from 'react-router';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logOut } from '../../services/authService';
import './NavBar.css';


export default function NavBar({ user }) {
  const navigate = useNavigate();
  function handleLogOut() {
    logOut();
    setUser(null);
  }
  return (

        <Navbar expand="md" bg="white" variant="light" className="fixed-top"> 
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="my-navbar-brand">Schedula</Navbar.Brand>

        <Navbar.Collapse id="responsive-navbar-nav"> 
          <Nav className="ms-auto align-items-center"> 
            {user?.avatar && (
              <div>
                <img
                  src={user.avatar}
                  width="34"
                  height="34"
                  className="rounded-circle my-nav-bar-avatar"
                  referrerPolicy="no-referrer"
                  alt="Avatar"
                />
              </div>
            )}
            {user ? (
              <>
                <span className="nav-link fw-bold">Welcome, {user.name}</span> 
                {user.role === 'student' ? (
                  <>
                    <Nav.Link as={NavLink} to="/appointments">View Teachers</Nav.Link>
                    <Nav.Link as={NavLink} to="/appointments/all">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogOut}>Log Out</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={NavLink} to="/sessions">Sessions</Nav.Link>
                    <Nav.Link as={NavLink} to="/sessions/new">Set Your Time</Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogOut}>Log Out</Nav.Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/signin">Sign Up/Log In</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        {/* The Navbar.Toggle will be visible on smaller screens if you keep expand="md" or "lg" */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      </Container>
    </Navbar>
  );
}