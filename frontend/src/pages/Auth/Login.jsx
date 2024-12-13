import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Tambahkan useNavigate
import axios from 'axios';
import bcrypt from 'bcryptjs';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]); // Menyimpan data users dari API
    const [error, setError] = useState(''); // Untuk menyimpan pesan error
    const navigate = useNavigate();  // Inisialisasi useNavigate

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

        // Mencari user berdasarkan email
        const user = users.find((user) => user.email === email);
        if (user) {
            // Membandingkan password yang dimasukkan dengan password terenkripsi menggunakan bcrypt
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    setError('An error occurred. Please try again.');
                } else if (isMatch) {
                    console.log('Login successful', user);
                    // Setelah login berhasil, arahkan ke halaman utama
                    navigate('/');  // Arahkan ke halaman '/'
                } else {
                    setError('Invalid email or password');
                }
            });
        } else {
            setError('Invalid email or password');
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

                {/* Error Message */}
                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
                )}

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
