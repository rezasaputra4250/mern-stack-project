import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaVideo, FaStore, FaUsers } from 'react-icons/fa'; // Import icon
import { FiMessageCircle, FiBell } from 'react-icons/fi'; // Import message and notification icons
import { BsGrid, BsSearch } from 'react-icons/bs'; // Import grid and search icons

const Navbar = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchRef = useRef(null);

    // Toggle searchbox visibility
    const toggleSearchBox = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    // Close searchbox when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="flex justify-between items-center">
                {/* Div 1: Logo and Searchbox (Left) */}
                <div className="flex items-center space-x-4">
                    <div className="text-lg font-bold">Fullstack</div>
                    {/* Searchbox */}
                    <div className="relative" ref={searchRef}>
                        {/* Show Searchbox on larger screens, icon on mobile */}
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`px-3 py-2 rounded border ${isSearchVisible ? 'block' : 'hidden'} md:block`}
                        />
                        {/* Search Icon on mobile */}
                        <BsSearch
                            className={`text-xl cursor-pointer md:hidden ${isSearchVisible ? 'hidden' : 'block'}`}
                            onClick={toggleSearchBox}
                        />
                    </div>
                </div>

                {/* Div 2: Links and Icons (Center) - Hidden on Mobile */}
                <div className="hidden md:flex space-x-6 justify-center flex-grow">
                    <Link to="/" className="hover:underline">
                        <FaHome className="text-xl" />
                    </Link>
                    <Link to="/" className="hover:underline">
                        <FaVideo className="text-xl" />
                    </Link>
                    <Link to="/" className="hover:underline">
                        <FaStore className="text-xl" />
                    </Link>
                    <Link to="/" className="hover:underline">
                        <FaUsers className="text-xl" />
                    </Link>
                </div>

                {/* Div 3: Grid, Message, Notification, User Image (Right) */}
                <div className="flex items-center space-x-6">
                    <BsGrid className="text-xl" />
                    <FiMessageCircle className="text-xl" />
                    <FiBell className="text-xl" />
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                        className="rounded-full w-10 h-10"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
