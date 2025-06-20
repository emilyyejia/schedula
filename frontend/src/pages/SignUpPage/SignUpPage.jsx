import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { signUp } from '../../services/authService';
import { Form } from 'react-bootstrap';
export default function SignUpPage({ setUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });
    const [errorMsg, setErrorMsg] = useState('');
    const location = useLocation();
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
            const from = location.state?.from || '/appointments';
            navigate(from);
        } catch (err) {
            setErrorMsg('Sign Up Failed -Try Again');
            console.log(err);
        }

    }


    const disable = formData.password !== formData.confirm;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Schedula for clients</h2>
            <h6 className="mb-4 text-center">Create an account or log in to book and manage your appointments.</h6>
            <div className="d-flex justify-content-center mb-4">

            </div>
            <div className='row text-center'>
                <form autoComplete="off" className="d-grid justify-content-center mb-4" onSubmit={handleSumbit}>
                    <Form.Label className="fs-5">Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

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
                    <Form.Label className="fs-5">Confirm</Form.Label>

                    <Form.Control
                        type="password"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className='mt-3 btn active' disabled={disable}>
                        Sign Up
                    </button>


                </form>

            </div>

            <p className="error-message">&nbsp;{errorMsg}</p>

        </div>
    );
}