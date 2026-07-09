// src/pages/Login.jsx

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/user/login', form)
            .then((response) => {
                const token = response.data.token;
                login(token);
                setMessage('Login successful!');
                navigate('/');
            })
            .catch((error) => {
                setMessage(error.response?.data?.message || 'Login failed.');
            });
    };

    return (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-400 hover:underline">
                    Signup here
                </Link>
            </p>
        </div>
    );
}

export default Login;
