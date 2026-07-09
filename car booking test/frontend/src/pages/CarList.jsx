// src/pages/CarList.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function CarList() {
    const [cars, setCars] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:3000/car')
            .then(response => setCars(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-white">Available Cars</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cars.map(car => (
                    <Link to={`/car/${car._id}`} key={car._id} className="bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition duration-300">
                        <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(http://localhost:3000/uploads/${car.images[0] || 'placeholder.jpg'})` }}>
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2 text-white">{car.make} {car.carModel}</h2>
                            <p className="text-gray-400">Year: {car.year}</p>
                            <p className="text-gray-400">Price: ${car.price.toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CarList;
