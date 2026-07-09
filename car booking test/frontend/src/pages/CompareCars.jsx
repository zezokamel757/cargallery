// src/pages/CompareCars.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function CompareCars() {
    const [cars, setCars] = useState([]);
    const [compare, setCompare] = useState({ car1: '', car2: '' });
    const [comparisonResult, setComparisonResult] = useState(null);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:3000/car')
            .then(response => setCars(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleCompare = () => {
        if (compare.car1 && compare.car2) {
            axios.get(`http://localhost:3000/car/compare/${compare.car1}/${compare.car2}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => setComparisonResult(response.data))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-white">Compare Cars</h1>
            <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <select
                    value={compare.car1}
                    onChange={(e) => setCompare({ ...compare, car1: e.target.value })}
                    className="p-2 bg-gray-700 text-white rounded mb-4 sm:mb-0"
                >
                    <option value="">Select Car 1</option>
                    {cars.map(car => (
                        <option key={car._id} value={car._id}>{car.make} {car.carModel}</option>
                    ))}
                </select>
                <select
                    value={compare.car2}
                    onChange={(e) => setCompare({ ...compare, car2: e.target.value })}
                    className="p-2 bg-gray-700 text-white rounded mb-4 sm:mb-0"
                >
                    <option value="">Select Car 2</option>
                    {cars.map(car => (
                        <option key={car._id} value={car._id}>{car.make} {car.carModel}</option>
                    ))}
                </select>
                <button
                    onClick={handleCompare}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Compare
                </button>
            </div>
            {comparisonResult && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <img
                            src={`http://localhost:3000/uploads/${comparisonResult.car1.images[0] || 'placeholder.jpg'}`}
                            alt={comparisonResult.car1.carModel}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h2 className="text-xl font-semibold mt-4 text-white">{comparisonResult.car1.make} {comparisonResult.car1.carModel}</h2>
                        <p className="text-gray-400">Year: {comparisonResult.car1.year}</p>
                        <p className="text-gray-400">Price: ${comparisonResult.car1.price.toLocaleString()}</p>
                        <p className="text-gray-400">Color: {comparisonResult.car1.color}</p>
                        <p className="text-gray-400">Mileage: {comparisonResult.car1.mileage.toLocaleString()} km</p>
                        <p className="text-gray-400">Fuel Type: {comparisonResult.car1.fuelType}</p>
                        <p className="text-gray-400">Transmission: {comparisonResult.car1.transmission}</p>
                        <p className="text-gray-400">Engine: {comparisonResult.car1.engine}</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <img
                            src={`http://localhost:3000/uploads/${comparisonResult.car2.images[0] || 'placeholder.jpg'}`}
                            alt={comparisonResult.car2.carModel}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h2 className="text-xl font-semibold mt-4 text-white">{comparisonResult.car2.make} {comparisonResult.car2.carModel}</h2>
                        <p className="text-gray-400">Year: {comparisonResult.car2.year}</p>
                        <p className="text-gray-400">Price: ${comparisonResult.car2.price.toLocaleString()}</p>
                        <p className="text-gray-400">Color: {comparisonResult.car2.color}</p>
                        <p className="text-gray-400">Mileage: {comparisonResult.car2.mileage.toLocaleString()} km</p>
                        <p className="text-gray-400">Fuel Type: {comparisonResult.car2.fuelType}</p>
                        <p className="text-gray-400">Transmission: {comparisonResult.car2.transmission}</p>
                        <p className="text-gray-400">Engine: {comparisonResult.car2.engine}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompareCars;
