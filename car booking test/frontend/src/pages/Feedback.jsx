// src/pages/Feedback.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function Feedback() {
    const [form, setForm] = useState({
        customerName: '',
        vehicleModel: '',
        review: '',
        rating: 5,
    });
    const [message, setMessage] = useState('');
    const { token } = useContext(AuthContext);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/feedback', form, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => setMessage('Feedback submitted!'))
            .catch(error => setMessage(error.response?.data?.message || 'Error submitting feedback.'));
    };

    return (
        <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-white">Feedback</h1>
            {message && <p className="mb-4 text-green-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="customerName"
                    placeholder="Your Name"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <input
                    type="text"
                    name="vehicleModel"
                    placeholder="Vehicle Model"
                    value={form.vehicleModel}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <textarea
                    name="review"
                    placeholder="Your Review"
                    value={form.review}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                ></textarea>
                <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    value={form.rating}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Submit Feedback</button>
            </form>
        </div>
    );
}

export default Feedback;
