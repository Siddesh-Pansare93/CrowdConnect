import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import authService from '../Backend/Appwrite/auth';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../store/Features/authSlice';
import { useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';


const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const storeUser = useSelector(state => state.auth.userData);
  console.log("storeUser: ", storeUser);

async function fetchCCuser(){
  const existingUser = await authService.getCurrentUser()
  console.log(existingUser);
  
}
fetchCCuser()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setError('');
    try {
      const user = await authService.login(data); // Perform login
      if (user) {
        const userData = await authService.getCurrentUser(); // Get current user data
        console.log(userData);
        if (userData) {
          dispatch(login(userData)); // Dispatch to store userData
          navigate("/"); // Navigate to the home page or wherever necessary
        }
      }
    } catch (error) {
      setError(error.message); // Show error if any
    }
  };

  // Function to generate a random 6-digit OTP
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  // Function to send OTP email using EmailJS
  const sendOTPEmail = async (email, otp) => {
    if (!email) {
      setError('Email is missing!');
      console.error('Email not provided for OTP');
      return;
    }

    const templateParams = {
      user_email: email, // Correctly use email from the form data
      otp_code: otp,
    };

    try {
      await emailjs.send(
        'service_eq3m2ed',  // Replace with your EmailJS service ID
        'template_fa9c7eo', // Replace with your EmailJS template ID
        templateParams,
        '152Q6uG2K9dkInbrZ'   // Replace with your EmailJS public key
      );
      console.log('OTP sent to email');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };
  
  const handleRegister = async (data) => {
    setError('');
    try {
      const otpCode = generateOTP();  // Generate OTP // Debug: log generated OTP
      console.log('Email provided:', data.email); // Debug: check if email is captured
  
      if (!data.email) {
        setError('Email field is empty! Please provide an email.');
        return; // Stop further execution if email is empty
      }
  
      sessionStorage.setItem('otp', otpCode);  // Store OTP in session storage
      sessionStorage.setItem('userData', JSON.stringify(data));  // Store user registration data temporarily
  
      sendOTPEmail(data.email, otpCode);  // Send OTP to the provided email
      navigate("/otp-verification");  // Redirect to OTP verification page
    } catch (error) {
      setError(error.message); // Handle registration errors
    }
  };
  

  // const handleRegister = async (data) => {
  //   setError('');
  //   try {
      
  //     const otpCode = generateOTP();  // Generate OTP
  //     sessionStorage.setItem('otp', otpCode);  // Store OTP in session storage
  //     sessionStorage.setItem('userData', JSON.stringify(data));  // Store user registration data temporarily
  //     sendOTPEmail(data.email, otpCode);  // Send OTP to email
  //     navigate("/otp-verification");  // Redirect to OTP verification page


      // const user = await authService.createAccount(data); // Create a new account
      // if (user) {
      //   const userData = await authService.getCurrentUser(); // Get current user data
      //   if (userData) {
      //     dispatch(login(userData)); // Dispatch to store userData
      //     navigate("/"); // Navigate after successful registration
  //       // }
  //     // }
  //   } catch (error) {
  //     setError(error.message); // Handle registration errors
  //   }
  // };

  const selectSubmitMethod = (data) => {
    if (isLogin) {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-pattern bg-cover bg-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-transparent rounded-3xl shadow-xl p-8 w-full max-w-md border  border-gray-200"

      >
        <div className="flex justify-center mb-8">
          <motion.div
            className="relative w-48 h-12 bg-gray-200 rounded-full p-1 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            <motion.div
              className="absolute w-20 h-10 bg-bg2 rounded-full"
              animate={{ x: isLogin ? 0 : 96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <div className="relative flex justify-around items-center h-full text-md font-medium">
              <span className={isLogin ? "text-white" : "text-gray-700"}>Login</span>
              <span className={!isLogin ? "text-white" : "text-gray-700"}>Register</span>
            </div>
          </motion.div>
        </div>

        {error && <p className="     text-red-600  font-semibold      ">{error}</p>}
        <form onSubmit={handleSubmit(selectSubmitMethod)} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-md  font-bold text-lg text-secondary">
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-3xl leading-5 bg-white placeholder-gray-500 focus:outline-yellow-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your name"
                />
              </div>
              {errors.name && <p className="mt-2 text-md      text-red-600  font-semibold     ">{errors.name.message}</p>}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-md  text-lg font-bold text-secondary">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-3xl leading-5 bg-white placeholder-gray-500 focus:outline-yellow-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-2 text-md      text-red-600  font-semibold     ">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-md text-lg  font-bold text-secondary">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-3xl leading-5 bg-white placeholder-gray-500 focus:outline-yellow-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="password"
              />
            </div>
            {errors.password && <p className="mt-2 text-md      text-red-600  font-semibold     ">{errors.password.message}</p>}
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-md   font-bold text-white bg-bg hover:border-white focus:outline-yellow-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Login" : "Register"}
            </motion.button>
          </div>
        </form>

        <p className="mt-4 text-center text-md text-secondary">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="  font-bold text-yellow-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginRegisterForm;