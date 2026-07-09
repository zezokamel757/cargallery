// src/pages/CarDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function CarDetail() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3000/car/${id}`)
            .then(response => setCar(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!car) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-white">{car.make} {car.carModel}</h1>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <div className="grid grid-cols-1 gap-4">
                        {car.images.map((img, index) => (
                            <img key={index} src={`http://localhost:3000/uploads/${img}`} alt={`${car.make} ${car.carModel}`} className="w-full h-64 object-cover rounded" />
                        ))}
                    </div>
                </div>
                <div className="md:w-1/2 md:pl-6">
                    <p className="text-gray-300 mb-2"><strong>Year:</strong> {car.year}</p>
                    <p className="text-gray-300 mb-2"><strong>Price:</strong> ${car.price.toLocaleString()}</p>
                    <p className="text-gray-300 mb-2"><strong>Color:</strong> {car.color}</p>
                    <p className="text-gray-300 mb-2"><strong>Mileage:</strong> {car.mileage.toLocaleString()} km</p>
                    <p className="text-gray-300 mb-2"><strong>Fuel Type:</strong> {car.fuelType}</p>
                    <p className="text-gray-300 mb-2"><strong>Transmission:</strong> {car.transmission}</p>
                    <p className="text-gray-300 mb-4"><strong>Engine:</strong> {car.engine}</p>
                    {/* Additional functionalities like booking can be added here */}
                </div>
            </div>
        </div>
    );
}

export default CarDetail;
