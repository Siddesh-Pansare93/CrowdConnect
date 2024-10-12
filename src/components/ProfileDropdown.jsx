import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogout } from './Header/Logout'; // Adjust the import path as necessary

const DEFAULT_AVATAR = "https://via.placeholder.com/256/000000/FFFFFF/?text=User";

const ProfileDropdown = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const handleLogOut = useLogout();

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleViewProfile = () => {
        navigate(`/profile/${user.id}`); // Adjust the route as necessary
    };

    const handleProfileSettings = () => {
        navigate('/profile-settings'); // Adjust the route as necessary
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <img
                    src={user?.avatar || DEFAULT_AVATAR} // Use user avatar or the default
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                >
                    <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={handleProfileSettings}
                    >
                        <FaCog className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Profile Settings
                    </a>
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={handleLogOut}
                    >
                        <FaSignOutAlt className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
