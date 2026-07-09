// src/components/CarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

function HeartIcon({ filled }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </svg>
    );
}

function CarCard({ car }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorited = isFavorite(car._id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        toggleFavorite(car._id);
    };

    return (
        <Link
            to={`/car/${car._id}`}
            className="relative bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition duration-300"
        >
            <div
                className="h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(http://localhost:3000/uploads/${car.images[0] || 'placeholder.jpg'})` }}
            />
            <button
                onClick={handleFavoriteClick}
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                className={`absolute top-2 right-2 p-1.5 rounded-full bg-gray-900 bg-opacity-70 transition-colors duration-200 ${
                    favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
                }`}
            >
                <HeartIcon filled={favorited} />
            </button>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">{car.make} {car.carModel}</h2>
                <p className="text-gray-400">Year: {car.year}</p>
                <p className="text-gray-400">Price: ${car.price.toLocaleString()}</p>
            </div>
        </Link>
    );
}

export default CarCard;
