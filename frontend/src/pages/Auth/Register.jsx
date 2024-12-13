import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import bcrypt from 'bcryptjs';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate(); // Inisialisasi navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Enkripsi password menggunakan bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Data pengguna dengan password terenkripsi
            const userData = {
                firstName,
                lastName,
                email,
                password: hashedPassword, // Gunakan password terenkripsi
                dateOfBirth,
                gender,
                role: 'student', // Nilai default untuk role
            };

            // Kirim data ke backend
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            console.log('User registered successfully:', data);
            // Redirect ke halaman login dengan pesan sukses
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });

        } catch (error) {
            console.error('Error registering user:', error);
            alert('Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-6 text-center">Register</h2>

                {/* First Name and Last Name in one row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Date of Birth</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

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

                {/* Password and Confirm Password in one row */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
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
                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded mb-4">
                    Register
                </button>

                <div className="text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
