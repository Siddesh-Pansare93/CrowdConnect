import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDropdown from '../ProfileDropdown';
import authService from '@/Backend/Appwrite/auth';
import { CgMenu } from 'react-icons/cg';
import { logout } from '@/store/Features/authSlice';

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState('/'); // Default active link

  const navitems = [
    { name: 'Home', link: '/', active: true },
    { name: 'Create Event', link: '/createevent', active: authStatus },
    { name: 'See All Events', link: '/allevents', active: authStatus },
    { name: 'Your Events', link: '/your-events', active: authStatus },
    { name: 'Registered Events', link: '/registered-events', active: authStatus },
    { name: 'Login', link: '/login', active: !authStatus },
    { name: 'Sign Up', link: '/signup', active: !authStatus },
    { name: 'About', link: '/about', active: true },
  ];

  const fetchUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      dispatch(logout());
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on mount
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (link) => {
    setActiveLink(link);
    setTimeout(() => {
      navigate(link);
    }, 300); // Match this timeout with your CSS transition duration
  };

  return (
    <header className='py-3 shadow bg-black text-white sticky z-10'>
      <nav className='flex items-center justify-between container mx-auto px-4'>
        <div className="mr-4">
          <Link to="/">
            <h1 className="text-xl font-bold">CrowdConnect</h1>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 relative">
          {navitems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.link)}
                className={`relative inline-block px-4 py-2 text-white rounded-2xl transition duration-200 transform hover:text-white ${activeLink === item.link ? 'active' : ''}`}
              >
                {item.name}
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform ${activeLink === item.link ? 'scale-x-1' : 'scale-x-0'}`} />
              </button>
            ) : null
          )}
          {authStatus && <ProfileDropdown user={user} />}
        </div>

        <button onClick={toggleMenu} className="md:hidden p-2">
          <CgMenu size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-black text-white p-4 space-y-2">
          {navitems.map((item) =>
            item.active ? (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item.link);
                  setMenuOpen(false);
                }}
                className={`relative w-full text-left px-4 py-2 bg-black text-white rounded transition duration-200 transform hover:text-white`}
              >
                {item.name}
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-white transition-all duration-300 transform ${activeLink === item.link ? 'scale-x-1' : 'scale-x-0'}`} />
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
