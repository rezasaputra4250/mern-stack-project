import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { FaHome, FaVideo, FaStore, FaUsers } from 'react-icons/fa'; // Import icon
import { FiMessageCircle, FiBell } from 'react-icons/fi'; // Import message and notification icons
import { BsGrid, BsSearch } from 'react-icons/bs'; // Import grid and search icons

const Navbar = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Untuk dropdown
    const searchRef = useRef(null);

    // Dummy value untuk unread messages dan notifications
    const unreadMessages = 3; // Misal ada 3 pesan yang belum dibaca
    const unreadNotifications = 5; // Misal ada 5 pemberitahuan yang belum dibaca

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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        // Menghapus data dari localStorage
        localStorage.removeItem('user'); // Atau sessionStorage.removeItem('user') jika menggunakan sessionStorage

        // Arahkan pengguna ke halaman login
        navigate('/login');
    };

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

                    {/* Message Icon with Badge */}
                    <div className="relative">
                        <FiMessageCircle className="text-xl" />
                        {unreadMessages > 0 && (
                            <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-3 h-3 flex items-center justify-center text-[8px]">
                                {unreadMessages}
                            </span>
                        )}
                    </div>

                    {/* Notification Icon with Badge */}
                    <div className="relative">
                        <FiBell className="text-xl" />
                        {unreadNotifications > 0 && (
                            <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-3 h-3 flex items-center justify-center text-[8px]">
                                {unreadNotifications}
                            </span>
                        )}
                    </div>

                    {/* User Avatar with Dropdown */}
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User Avatar"
                            className="rounded-full w-10 h-10 cursor-pointer"
                            onClick={toggleDropdown} // Menampilkan dropdown saat avatar diklik
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
                                <ul>
                                    <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer">Ganti Password</li>
                                    <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer">Ganti Foto Profil</li>
                                    <li
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
