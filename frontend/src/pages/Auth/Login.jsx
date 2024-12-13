import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = users.find((user) => user.email === email);
        if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    setError('An error occurred. Please try again.');
                } else if (isMatch) {
                    console.log('Login successful', user);

                    // Simpan data pengguna dalam localStorage
                    localStorage.setItem('user', JSON.stringify(user));  // Menyimpan user dalam session

                    // Arahkan ke halaman utama setelah login berhasil
                    navigate('/');
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

                {successMessage && (
                    <div className="mb-4 text-green-500 text-sm text-center">{successMessage}</div>
                )}

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
