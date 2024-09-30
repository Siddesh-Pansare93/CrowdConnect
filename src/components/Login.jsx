import authService from '@/Appwrite/auth';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as storeLogin } from '@/store/Features/authSlice';

function Login() {

  const [error , setError ]= useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async ({ data }) => {
    setError('')
    // login logic here
    try {
      console.log("Login button clicked");
      const user = await  authService.login({ ...data })
      if (user) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          console.log(userData)
          dispatch(storeLogin(userData))
          navigate("/")
        }
      }
    }catch (error) {
          console.log(error.message)
          navigate("/")
        }
      }
    
    

  return (
    <div>Login </div>
  )
}

export default Login