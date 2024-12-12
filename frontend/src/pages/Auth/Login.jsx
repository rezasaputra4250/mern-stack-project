import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]); // Menyimpan data users dari API

    // Mengambil data users dari API saat komponen dimuat
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data); // Menyimpan data users ke state
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []); // Kosongkan array dependencies untuk hanya memanggil sekali saat komponen dimuat

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login', { email, password });

        // Tambahkan logic untuk memeriksa apakah email dan password cocok dengan data pengguna
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            console.log('Login successful', user);
            // Arahkan ke halaman lain atau simpan informasi user
        } else {
            console.log('Invalid email or password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-6 text-center">Login</h2>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-4">
                    Login
                </button>

                <div className="text-center">
                    <p className="text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
