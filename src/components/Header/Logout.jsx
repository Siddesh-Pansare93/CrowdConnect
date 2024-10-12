import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/Features/authSlice';
import authService from '../../Backend/Appwrite/auth';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return handleLogOut;
};

export default function Logout() {
    const handleLogOut = useLogout();

    return (
        <div className='mt-2 pl-4'>
            <button onClick={handleLogOut}>Logout</button>
        </div>
    );
}
