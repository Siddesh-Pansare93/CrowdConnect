import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import authService from '../Backend/Appwrite/auth';
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from '../store/Features/authSlice';  // Import the logout action
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const storeUser = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnload = (event) => {
      if (!event.persisted) {  // Prevent clearing data on page reload
        sessionStorage.removeItem('userData');  // Clear session storage
        sessionStorage.removeItem('otp');       // Clear OTP if stored
        dispatch(logout());  // Dispatch Redux action to clear store
      }
    };

    window.addEventListener('pagehide', handleUnload);  // `pagehide` detects actual page close or navigation

    return () => {
      window.removeEventListener('pagehide', handleUnload);
    };
  }, [dispatch]);

  const handleLogin = async (data) => {
    setError('');
    try {
      const user = await authService.login(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const sendOTPEmail = async (email, otp) => {
    if (!email) {
      setError('Email is missing!');
      return;
    }

    const templateParams = {
      user_email: email,
      otp_code: otp,
    };

    try {
      await emailjs.send(
        'service_eq3m2ed',
        'template_fa9c7eo',
        templateParams,
        '152Q6uG2K9dkInbrZ'
      );
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  const handleRegister = async (data) => {
    setError('');
    try {
      const otpCode = generateOTP();
      sessionStorage.setItem('otp', otpCode);
      sessionStorage.setItem('userData', JSON.stringify(data));
      sendOTPEmail(data.email, otpCode);
      navigate("/otp-verification");
    } catch (error) {
      setError(error.message);
    }
  };

  const selectSubmitMethod = (data) => {
    if (isLogin) {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-pattern bg-cover bg-center p-4">
      <motion.div className="bg-transparent rounded-3xl shadow-xl p-8 w-full max-w-md border border-gray-200">
        <form onSubmit={handleSubmit(selectSubmitMethod)} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-md font-bold text-lg text-secondary">Name</label>
              <input id="name" type="text" {...register("name", { required: "Name is required" })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-3xl"
                placeholder="Your name" />
              {errors.name && <p className="mt-2 text-md text-red-600 font-semibold">{errors.name.message}</p>}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-md text-lg font-bold text-secondary">Email</label>
            <input id="email" type="email" {...register("email", { required: "Email is required" })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-3xl"
              placeholder="you@example.com" />
            {errors.email && <p className="mt-2 text-md text-red-600 font-semibold">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-md text-lg font-bold text-secondary">Password</label>
            <input id="password" type="password" {...register("password", { required: "Password is required" })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-3xl"
              placeholder="password" />
            {errors.password && <p className="mt-2 text-md text-red-600 font-semibold">{errors.password.message}</p>}
          </div>
          <motion.button type="submit" className="w-full py-2 px-4 bg-bg2 rounded-3xl">
            {isLogin ? "Login" : "Register"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginRegisterForm;
