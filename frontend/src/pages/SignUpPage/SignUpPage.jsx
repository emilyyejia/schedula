import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { GoogleLogin } from '@react-oauth/google';

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
    const token = credentialResponse.credential;
    try {
      const res = await fetch('http://localhost:3000/api/auth/googlelogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      await res.json();

    } catch (err) {
      setErrorMsg('Google Sign Up Failed -Try Again');

    }
  }
  const disable = formData.password !== formData.confirm;

  return (
    <>
      <h2>Schedula for clients</h2>
      <h4>Create an account or log in to book and manage your appointments.</h4>
            <div>
        <h3>Or sign up with Google:</h3>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Google login failed')}
        />
      </div>
      <form autoComplete="off" onSubmit={handleSumbit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Confirm</label>
        <input
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={disable}>
          SIGN UP
        </button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>

    </>
  );
}