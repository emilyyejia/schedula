import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import { Form } from 'react-bootstrap';
import * as authService from '../../services/authService';

export default function LogInPage({ setUser }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') ? decodeURIComponent(queryParams.get('email')): '';
  
  const [formData, setFormData] = useState({
    email: email,
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      if (user.role === "student"){
        const from = location.state?.from|| '/appointments';
        navigate(from);
      } else navigate('/sessions/new');
      
    } catch (err) {
      console.log(err);
      setErrorMsg('Log In Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Schedula for clients</h2>
      <h6 className="mb-4 text-center">Create an account or log in to book and manage your appointments.</h6>
      <div className="d-flex justify-content-center mb-4">

      </div>
      <div className='row text-center'>
        <form autoComplete="off" className="d-grid justify-content-center mb-4" onSubmit={handleSubmit}>
          <Form.Label htmlFor='email' className="fs-5">Email</Form.Label>
          <Form.Control
            className="w-100"
            type="email"
            name="email"
            value={formData.email}
            id="email"
            onChange={handleChange}
            required
          />
          <Form.Label className="fs-5">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className='mt-3 btn active'>
            Log In
          </button>


        </form>
      </div>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </div>
  );
}