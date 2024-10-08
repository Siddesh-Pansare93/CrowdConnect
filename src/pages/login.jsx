import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import authService from "@/Backend/Appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/Features/authSlice";
import { useNavigate } from "react-router-dom";


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

  const sendOTP = async (email) =>{
    
  }
  
  const handleLogin = async (data) => {
    setError('');
    try {
      const user = await authService.session(data); // Perform login
      // if(user.emailVerification == false){
      //   navigate("/signup")
      // }
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

  const handleRegister = async (data) => {
    setError('');
    try {
      const user = await authService.createAccount(data); // Create a new account
      const session = await authService.session(user?.email,user?.password)
      console.log(session)
      const link = await authService.verification("http://localhost:5173/Verify")
      console.log(link)
      if (user) {
        const userData = await authService.getCurrentUser(); // Get the current user data
        console.log(userData);
        if (userData) {
          dispatch(login(userData)); // Dispatch to store userData
          navigate("/"); // Navigate after successful registration
        }
      }
    } catch (error) {
      setError(error.message); // Handle registration errors
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
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            className="relative w-48 h-12 bg-gray-200 rounded-full p-1 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            <motion.div
              className="absolute w-24 h-10 bg-gray-600 rounded-full"
              animate={{ x: isLogin ? 0 : 96 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <div className="relative flex justify-around items-center h-full text-sm font-medium">
              <span className={isLogin ? "text-white" : "text-gray-700"}>Login</span>
              <span className={!isLogin ? "text-white" : "text-gray-700"}>Register</span>
            </div>
          </motion.div>
        </div>

        {error && <p className="text-red-600 ">{error}</p>}
        <form onSubmit={handleSubmit(selectSubmitMethod)} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Your name"
                />
              </div>
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder=""
              />
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Login" : "Register"}
            </motion.button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-black hover:text-gray-700"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginRegisterForm;