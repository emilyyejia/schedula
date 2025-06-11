import { useState } from 'react';
import { useNavigate } from 'react-router';
import { checkUser } from '../../services/authService';
import { GoogleLogin } from '@react-oauth/google';
import { Form } from 'react-bootstrap';
import { googleLogin } from '../../services/authService';
export default function SignInPage({ setUser }) {
  const [formData, setFormData] = useState({ email: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }
  async function handleSumbit(evt) {
    evt.preventDefault();
    try {
      console.log(formData.email);

      const exists = await checkUser(formData.email);
      console.log(exists);
      if (exists) {
        navigate(`/login?email=${encodeURIComponent(formData.email)}`);

      } else {
        navigate('/signup');

      }

    } catch (err) {
      setErrorMsg('Sign In Failed -Try Again');
      console.log(err);
    }

  }

  async function handleGoogleSuccess(credentialResponse) {
    const token = credentialResponse.credential;
    try {   
      const body = await googleLogin(token);
      setUser(body.user);
      navigate('/posts');
    } catch (err) {
      setErrorMsg('Google Sign Up Failed -Try Again');

    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Schedula for clients</h2>
      <h6 className="mb-4 text-center">Create an account or log in to book and manage your appointments.</h6>
      <div className="d-flex justify-content-center mb-4">

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
        />

      </div>
      <div className="d-flex align-items-center my-4">
        <hr className="flex-grow-1" />
        <span className="px-2 text-muted">OR</span>
        <hr className="flex-grow-1" />
      </div>
      <div className='row text-center'>
        <form autoComplete="off" className="d-grid justify-content-center mb-4" onSubmit={handleSumbit}>

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
          <button type="submit" className='mt-3 btn active'>
            Continue
          </button>


        </form>

      </div>

      <p className="error-message">&nbsp;{errorMsg}</p>

    </div>
  );
}