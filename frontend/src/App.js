import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import MainLayout from './components/Layouts/MainLayout';

const App = () => {
    return (
        <Router>
            {/* Halaman Login dan Register tidak menggunakan MainLayout */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Halaman lainnya menggunakan MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
