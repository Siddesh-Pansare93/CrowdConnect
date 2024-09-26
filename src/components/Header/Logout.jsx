import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/Features/authSlice'
import authService from '../../../Appwrite/auth'
import { useNavigate } from 'react-router-dom'


function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = ()=>{
        authService.logout().then(
            () => {
                    dispatch(logout())
                    navigate('/')
            }

        )
    }
    
  
    return (
    <div>
        <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default Logout