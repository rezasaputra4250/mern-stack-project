import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
    return (
        <aside className="bg-gray-100 w-64 h-screen p-4">
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                    </li>
                    {/* Menu untuk Murid */}
                    {role === 'student' ? (
                        <>
                            <li className="mb-4">
                                <Link to="/courses" className="text-blue-600 hover:underline">My Courses</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/assignments" className="text-blue-600 hover:underline">Assignments</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/grades" className="text-blue-600 hover:underline">My Grades</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/schedule" className="text-blue-600 hover:underline">Schedule</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
                            </li>
                        </>
                    ) : null}
                    {/* Menu untuk Guru */}
                    {role === 'teacher' ? (
                        <>
                            <li className="mb-4">
                                <Link to="/my-students" className="text-blue-600 hover:underline">My Students</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/courses" className="text-blue-600 hover:underline">My Courses</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/assignments" className="text-blue-600 hover:underline">Assignments</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/grades" className="text-blue-600 hover:underline">Grades</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/schedule" className="text-blue-600 hover:underline">Schedule</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/messages" className="text-blue-600 hover:underline">Messages</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/resources" className="text-blue-600 hover:underline">Resources</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/reports" className="text-blue-600 hover:underline">Reports</Link>
                            </li>
                        </>
                    ) : null}
                    {/* Menu Login dan Register */}
                    <li>
                        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </li>
                    <li>
                        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
