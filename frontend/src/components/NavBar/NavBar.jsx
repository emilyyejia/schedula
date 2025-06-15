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

        <div className="d-flex align-items-center ms-auto">
          {user?.avatar && (
            <div className="p-2 me-3">
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
          <div className="dropdown">
            <button
              className="navbar-toggler"
              type="button"
              id="dropdownToggler"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ boxShadow: 'none' }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="dropdown-menu mt-3 dropdown-menu-end" aria-labelledby="dropdownMenu2">
              {user ? (
                <>
                  <li><span className="dropdown-item-text fw-bold py-2">Welcome, {user.name}</span></li>
                  {user.role === 'student' ? (
                    <>
                      <li><NavLink className="dropdown-item " to="/appointments/all">Appointments</NavLink></li>
                      <li><NavLink className="dropdown-item " to="/">Book Your Slot</NavLink></li>
                      <li><Link to="/" className="dropdown-item " onClick={handleLogOut}>Log Out</Link></li>
                    </>
                  ) : (
                    <>
                      <li><NavLink className="dropdown-item " to="/sessions">Sessions</NavLink></li>
                      <li><NavLink className="dropdown-item " to="/sessions/new">Set Your Time</NavLink></li>
                      <li><Link to="/" className="dropdown-item " onClick={handleLogOut}>Log Out</Link></li>
                    </>
                  )}
                </>
              ) : (
                <>
                  <li><NavLink className="dropdown-item fw-bold py-2" to="/signin">Sign Up/Log In</NavLink></li>
                  <li><NavLink className="dropdown-item " to="/">About Us</NavLink></li>

                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}