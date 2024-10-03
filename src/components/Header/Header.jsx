import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from './Logout';
import { CgProfile } from 'react-icons/cg';
import authService from '@/Appwrite/auth';


function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [user, setUser] = useState(null);

  const navitems = [
    { name: 'Home', link: '/', active: true },
    { name: 'Create Event', link: '/createevent', active: authStatus },
    { name: 'Your Events', link: '/your-events', active: authStatus },
    { name: 'Login', link: '/login', active: !authStatus },
    { name: 'SignUp', link: '/signup', active: !authStatus },
    { name: 'About', link: '/About', active: !authStatus },
    
  ];

  const toggleProfilePanel = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const fetchUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  useEffect(() => {
    if (isProfileVisible) {
      fetchUser();
    }
  }, [isProfileVisible]);

  return (
    <header className='py-3 shadow bg-black text-white sticky'>
      <nav className='flex mr-10'>
        <div className="mr-4">
          <Link to="/">
            <h1>Logo</h1>
          </Link>
        </div>
        <ul className='flex ml-auto'>
          {navitems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.link)}
                  className='inline-block px-6 py-2 duration-200 hover:bg-gray-100 hover:text-black rounded-full'
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <>
              <li onClick={toggleProfilePanel} className="cursor-pointer">
                <CgProfile className="h-5 w-5 mt-3" />
              </li>
              <li>
                <Logout />
              </li>
            </>
          )}
        </ul>
      </nav>

      {isProfileVisible && user && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-3 absolute right-10 z-10">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <p className="mt-1 text-gray-900">{user.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <p className="mt-1 text-gray-900">{user.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password:</label>
              <p className="mt-1 text-gray-900">{user.password || 'N/A'}</p>
            </div>
            <button
              onClick={() => setIsProfileVisible(false)}
              className="mt-4 w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
