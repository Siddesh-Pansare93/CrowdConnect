import React from "react";
import { useNavigate } from "react-router-dom"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';
import { useSelector } from "react-redux";

const Home = () => {
   const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate(); 

    const handleGetStarted = () => {
        navigate("/signup");
    };
    const handleExploreEvents = () => {
        navigate("/allevent"); 
    };

    return (
        <main className="relative flex items-center justify-center min-h-screen">
            {/* Spline as background */}
            <div className="fixed inset-0 z-0 w-full h-full">
                <Spline
                    scene="https://prod.spline.design/FsnGAumr8Orx2cRL/scene.splinecode"
                    className="w-full h-full object-cover"
                    style={{ zIndex: 1 }} // Keep a positive z-index
                />
            </div>

            {/* Content on top */}
            <div className="relative z-10 flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold">CrowdConnect</h1>
                <p className="mt-4 text-lg">Connecting people for better events.</p>

                {/* Get Started Button */}
                {authStatus ? (
                    <motion.button
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        onClick={handleExploreEvents}
                    >
                        Explore Events
                    </motion.button>
                ) : (
                    <motion.button
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        onClick={handleGetStarted}
                    >
                        Get Started
                    </motion.button>
                )}
            </div>
        </main>
    );
};

export default Home;
