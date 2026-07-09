// src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/user/signup', form)
            .then(response => {
                const token = response.data.token;
                login(token);
                setMessage('Signup successful!');
                navigate('/');
            })
            .catch(error => {
                setMessage(error.response?.data?.message || 'Signup failed.');
            });
    };

    return (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-white">Signup</h1>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Signup</button>
            </form>
            <p className="mt-4 text-gray-400">
                Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login here</Link>
            </p>
        </div>
    );
}

export default Signup;
