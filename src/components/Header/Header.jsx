import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropdown from '../ProfileDropdown';
import authService from '@/Backend/Appwrite/auth';
import { CgMenu } from 'react-icons/cg'; // Hamburger icon
import { logout } from '@/store/Features/authSlice';

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch()

  const navitems = [
    { name: 'Home', link: '/', active: true },
    { name: 'Create Event', link: '/createevent', active: authStatus },
    { name: 'See All Events', link: '/allevents', active: authStatus },
    { name: 'Your Events', link: '/your-events', active: authStatus },
    { name: 'Registered Events', link: '/registered-events', active: authStatus },
    { name: 'Login', link: '/login', active: !authStatus },
    { name: 'SignUp', link: '/signup', active: !authStatus },
    // { name: 'Normal', link: '/normal', active: !authStatus },
    { name: 'About', link: '/about', active: authStatus },// isko active rako as user can see it without login

  ];

  const fetchUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      dispatch(logout())
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on mount
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className='py-3 shadow bg-black text-white sticky z-10'>
      <nav className='flex items-center justify-between'>
        <div className="mr-4">
          <Link to="/">
            <h1 className="text-xl font-bold">CrowdConnect</h1>
            
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {navitems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => navigate(item.link)}
                className='inline-block px-4 py-2 duration-200 hover:bg-gray-700 rounded-md'
              >
                {item.name}
              </button>
            ) : null
          )}
          {authStatus && <ProfileDropdown user={user} />}
        </div>

        {/* Hamburger Icon for smaller screens */}
        <button onClick={toggleMenu} className="md:hidden p-2">
          <CgMenu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white p-4 space-y-2">
          {navitems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.link);
                  setMenuOpen(false); // Close the menu after navigating
                }}
                className='w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md'
              >
                {item.name}
              </button>
            ) : null
          )}
          {authStatus && <ProfileDropdown user={user} />}
        </div>
      )}
    </header>
  );
}

export default Header;
