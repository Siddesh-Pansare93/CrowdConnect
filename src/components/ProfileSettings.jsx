import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import authService from '../../Backend/Appwrite/auth'; // Adjust the path as needed
import authService from '@/Backend/Appwrite/auth'; // Adjust the path as needed
import { updateUser } from '@/store/Features/authSlice'; // Assuming you have an updateUser action

const ProfileSettings = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        interests: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user data when the component mounts
        const fetchUserData = async () => {
            try {
                const user = await authService.getCurrentUser(); // Adjust based on your service
                setUserData({
                    name: user.name || '',
                    email: user.email || '',
                    interests: user.interests || '',
                });
            } catch (error) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authService.updateUser(userData); // Adjust based on your service
            dispatch(updateUser(userData)); // Dispatch the action to update the Redux store
            alert('Profile updated successfully!');
        } catch (error) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Interests</label>
                    <textarea
                        name="interests"
                        value={userData.interests}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        rows="3"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;
