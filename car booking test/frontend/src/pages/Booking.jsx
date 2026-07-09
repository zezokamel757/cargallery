// src/pages/Booking.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function Booking() {
    const [cars, setCars] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [form, setForm] = useState({
        customerName: '',
        email: '',
        phone: '',
        carModel: '',
        preferredDate: '',
        preferredTimeSlot: '',
    });
    const [message, setMessage] = useState('');
    const { token } = useContext(AuthContext);

    // Business hours and booking duration constants
    const BUSINESS_HOURS = {
        start: '09:00',
        end: '17:00',
    };
    const MIN_DURATION = 30; // minutes
    const MAX_DURATION = 120; // minutes

    useEffect(() => {
        axios.get('http://localhost:3000/car')
            .then(response => setCars(response.data))
            .catch(error => console.error(error));
    }, []);

    // Fetch available time slots when car model or date changes
    useEffect(() => {
        if (form.carModel && form.preferredDate) {
            fetchAvailableSlots();
        }
    }, [form.carModel, form.preferredDate]);

    const fetchAvailableSlots = async () => {
        try {
            console.log('Fetching slots for:', {
                carModel: form.carModel,
                date: form.preferredDate
            });
            const response = await axios.get(
                `http://localhost:3000/book-test-drive/available-slots?carModel=${form.carModel}&date=${form.preferredDate}`
            );
            console.log('Available slots response:', response.data);
            setAvailableSlots(response.data);
        } catch (error) {
            console.error('Error fetching available slots:', error.response?.data || error.message);
            setAvailableSlots([]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        
        // Clear time slot when date or car model changes
        if (name === 'preferredDate' || name === 'carModel') {
            setForm(prev => ({ ...prev, preferredTimeSlot: '' }));
        }
    };

    const validateTimeSlot = (timeSlot) => {
        const [start, end] = timeSlot.split('-').map(time => time.trim());
        
        // Check business hours
        if (start < BUSINESS_HOURS.start || end > BUSINESS_HOURS.end) {
            return 'Booking must be between 9:00 AM and 5:00 PM';
        }

        // Check duration
        const startTime = new Date(`2000-01-01T${start}`);
        const endTime = new Date(`2000-01-01T${end}`);
        const durationMinutes = (endTime - startTime) / (1000 * 60);

        if (durationMinutes < MIN_DURATION) {
            return `Booking must be at least ${MIN_DURATION} minutes`;
        }
        if (durationMinutes > MAX_DURATION) {
            return `Booking cannot exceed ${MAX_DURATION} minutes`;
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate time slot
        const timeSlotError = validateTimeSlot(form.preferredTimeSlot);
        if (timeSlotError) {
            setMessage(timeSlotError);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/book-test-drive', form, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMessage('Booking successful!');
            // Reset form after successful booking
            setForm({
                customerName: '',
                email: '',
                phone: '',
                carModel: '',
                preferredDate: '',
                preferredTimeSlot: '',
            });
            setAvailableSlots([]);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Booking failed.');
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-white">Book a Test Drive</h1>
            {message && (
                <p className={`mb-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
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
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                <select
                    name="carModel"
                    value={form.carModel}
                    onChange={handleChange}
                    required
                    className="w-full p-2 bg-gray-700 text-white rounded"
                >
                    <option value="">Select Car Model</option>
                    {cars.map(car => (
                        <option key={car._id} value={car.carModel}>{car.make} {car.carModel}</option>
                    ))}
                </select>
                <input
                    type="date"
                    name="preferredDate"
                    value={form.preferredDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 bg-gray-700 text-white rounded"
                />
                {form.carModel && form.preferredDate && (
                    <div className="space-y-2">
                        <label className="block text-white">Available Time Slots:</label>
                        <div className="grid grid-cols-3 gap-2">
                            {availableSlots.map((slot, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, preferredTimeSlot: slot }))}
                                    className={`p-2 rounded ${
                                        form.preferredTimeSlot === slot
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                        {availableSlots.length === 0 && (
                            <p className="text-yellow-500">No available slots for this date</p>
                        )}
                    </div>
                )}
                <div className="text-sm text-gray-400">
                    <p>• Bookings are available between 9:00 AM and 5:00 PM</p>
                    <p>• Minimum booking duration: 30 minutes</p>
                    <p>• Maximum booking duration: 2 hours</p>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    disabled={!form.preferredTimeSlot}
                >
                    Book Now
                </button>
            </form>
        </div>
    );
}

export default Booking;
