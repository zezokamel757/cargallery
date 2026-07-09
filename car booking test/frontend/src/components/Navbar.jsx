// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/compare" className="text-white hover:text-gray-300">Compare Cars</Link>
                    <Link to="/booking" className="text-white hover:text-gray-300">Book Test Drive</Link>
                    <Link to="/feedback" className="text-white hover:text-gray-300">Feedback</Link>
                </div>
                <div className="flex space-x-4">
                    {user ? (
                        <>
                            <span className="text-white">Hello, {user.name}</span>
                            <button onClick={logout} className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                            <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
