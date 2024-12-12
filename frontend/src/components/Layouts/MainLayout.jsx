import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 bg-gray-50">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
