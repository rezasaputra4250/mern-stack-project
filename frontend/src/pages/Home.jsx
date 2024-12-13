import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Pastikan axios sudah terinstal

const Home = () => {
    const [activities, setActivities] = useState([]);  // Menyimpan data activity
    const [loading, setLoading] = useState(true);  // Untuk menampilkan loading state
    const [error, setError] = useState('');  // Untuk menampilkan pesan error jika terjadi kesalahan

    useEffect(() => {
        // Mengambil data dari API
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/activity');
                setActivities(response.data);  // Menyimpan data yang diterima ke state
                setLoading(false);  // Set loading menjadi false setelah data diterima
            } catch (error) {
                console.error('Error fetching activities:', error);
                setError('Failed to fetch activities.');
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);  // Kosongkan array dependencies agar hanya dipanggil sekali saat komponen pertama kali dimuat

    if (loading) {
        return <p>Loading...</p>;  // Menampilkan loading saat data sedang diambil
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;  // Menampilkan error jika terjadi masalah
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to the Home Page</h2>
            <p className="mb-6">Here is a list of activities:</p>

            {/* Menampilkan daftar activities */}
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id} className="mb-4 p-4 border rounded shadow-sm">
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p>{activity.description}</p>
                        <span className="text-gray-500 text-sm">{activity.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
