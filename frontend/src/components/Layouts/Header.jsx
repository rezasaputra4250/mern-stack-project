import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h1 className="text-lg font-bold">Fullstack</h1>
            <ul className="flex space-x-4">
                <li>
                    <a href="/" className="hover:underline">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/login" className="hover:underline">
                        Login
                    </a>
                </li>
                <li>
                    <a href="/register" className="hover:underline">
                        Register
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
