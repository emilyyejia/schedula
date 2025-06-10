import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import { Form } from 'react-bootstrap';
export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }
  async function handleSumbit(evt) {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
      navigate('/posts');
    } catch (err) {
      setErrorMsg('Sign Up Failed -Try Again');
      console.log(err);
    }

  }

  async function handleGoogleSuccess(credentialResponse) {
    console.log(credentialResponse);
    const token = credentialResponse.credential;
    try {
      const res = await fetch('http://localhost:3000/api/auth/googlelogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const body = await res.json();  
      setUser(body.user);
      localStorage.setItem('token', body.token);
      navigate('/posts');
    } catch (err) {
      setErrorMsg('Google Sign Up Failed -Try Again');

    }
  }
  const disable = formData.password !== formData.confirm;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Schedula for clients</h2>
      <h6 className="mb-4 text-center">Create an account or log in to book and manage your appointments.</h6>
      <div className="d-flex justify-content-center mb-4">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
        />
      </div>
<div class="d-flex align-items-center my-4">
  <hr class="flex-grow-1" />
  <span class="px-2 text-muted">OR</span>
  <hr class="flex-grow-1" />
</div>
   <div className='row text-center'> 
     <form autoComplete="off" div className="d-grid justify-content-center mb-4" onSubmit={handleSumbit}>

        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          className="w-100"
          type="email"
          name="email"
          value={formData.email}
          id="email"
          onChange={handleChange}
          required
        />
        <button type="submit" className='mt-3 btn active' disabled={disable}>
          SIGN UP
        </button>


      </form>
          
        </div>
     
      <p className="error-message">&nbsp;{errorMsg}</p>

    </div>
  );
}