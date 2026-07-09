// src/pages/CarList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import { useFavorites } from '../contexts/FavoritesContext';

function CarList() {
    const [cars, setCars] = useState([]);
    const [filter, setFilter] = useState('all');
    const { isFavorite } = useFavorites();

    useEffect(() => {
        axios.get('http://localhost:3000/car')
            .then(response => setCars(response.data))
            .catch(error => console.error(error));
    }, []);

    const displayedCars = filter === 'favorites'
        ? cars.filter(car => isFavorite(car._id))
        : cars;

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-white">Available Cars</h1>
                <div className="flex rounded-lg overflow-hidden border border-gray-600">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                            filter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('favorites')}
                        className={`px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                            filter === 'favorites'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                    >
                        ❤ Favorites
                    </button>
                </div>
            </div>

            {filter === 'favorites' && displayedCars.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <span className="text-6xl mb-4">🤍</span>
                    <h2 className="text-2xl font-semibold text-white mb-2">No favorite vehicles yet.</h2>
                    <p className="text-gray-400">Start adding vehicles to your favorites.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {displayedCars.map(car => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CarList;
