import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from "@/Appwrite/auth";  // Assuming authService handles user registration
import { useDispatch } from 'react-redux';
import { login } from "@/store/Features/authSlice";

const OTPVerification = () => {
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the generated OTP and user data from session storage
  const generatedOTP = sessionStorage.getItem('otp');
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  // Handle OTP verification and registration
  const handleOTPVerification = async () => {
    if (otp === generatedOTP) {
      setMessage('OTP verified successfully! Completing registration...');

      try {
        // Now proceed to register the user since OTP is verified
        const user = await authService.createAccount(userData);

        if (user) {
          const userDatas = await authService.getCurrentUser()
          if (userDatas) {
            sessionStorage.removeItem('otp'); // Clear OTP after successful verification
            sessionStorage.removeItem('userData'); // Clear userData
            setMessage('Registration complete!');
            dispatch(login(userDatas)); // Dispatch to store userData
            navigate("/"); // Redirect to main page
          }
          
        }
      } catch (error) {
        setMessage('Failed to complete registration. Please try again.');
        console.error(error);
      }
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-center text-xl font-semibold mb-4">Enter 6 Digit OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleOTPVerification}
          className="w-full bg-black text-white py-2 px-4 rounded-md"
        >
          Verify OTP
        </button>
        <p className="mt-4 text-center">{message}</p>
      </div>
    </div>
  );
};

export default OTPVerification;
