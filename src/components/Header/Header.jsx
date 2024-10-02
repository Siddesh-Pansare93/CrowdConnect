import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from './Logout'

function Header() {


  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)


  const navitems = [
    {
      name: "Home",
      link: "/",
      active: true
    },
    {
      name: "Create Event",
      link: "/createevent",
      // active: authStatus
    },
    {
      name: "Your Events",
      link: "/your-events",
      active: authStatus
    },
    {
      name: "Login",
      link: "/login",
      active: !authStatus
    },
    {
      name: "SignUp",
      link: "/signup",
      active: !authStatus
    },

  ]
  return (

    <header className='py-3 shadow bg-black text-white sticky'>
      <nav className='flex mr-10'>
        <div className="mr-4">
          <Link>
            <h1>Logo</h1>
          </Link>
        </div>
        <ul className='flex ml-auto '>
          {navitems.map((item) => (
            item.active ? (<li key={item.name}>
              <button
                onClick={() => navigate(item.link)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-gray-100 hover:text-black rounded-full'
              >
                {item.name}
              </button>
            </li>) : null
          ))}
          {authStatus && (
            <li>
              <Logout />
            </li>)}
        </ul>



      </nav>
    </header>

  )
}

export default Header