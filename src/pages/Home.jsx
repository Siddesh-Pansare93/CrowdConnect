import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <nav className="bg-gray-800 shadow-md">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="text-xl font-bold text-white">Logo</div>
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white transition duration-300">About</a>
                        <a href="#" className="text-gray-300 hover:text-white transition duration-300">Services</a>
                        <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 flex flex-col items-start">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-4"
                    >
                        Connect with the Crowd
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-300 mb-8"
                    >
                        Engage, interact, and build lasting connections in our vibrant community.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                        Join Us
                    </motion.button>
                    <div className="flex space-x-4 mt-8">
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="text-gray-400 hover:text-blue-400 transition duration-300"
                        >
                            <FaFacebook size={24} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="text-gray-400 hover:text-blue-400 transition duration-300"
                        >
                            <FaTwitter size={24} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="text-gray-400 hover:text-pink-400 transition duration-300"
                        >
                            <FaInstagram size={24} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            href="#"
                            className="text-gray-400 hover:text-blue-400 transition duration-300"
                        >
                            <FaLinkedin size={24} />
                        </motion.a>
                    </div>
                </div>
                <div className="md:w-1/2 mt-12 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-64 md:h-96 bg-gray-700 rounded-lg shadow-lg flex items-center justify-center"
                    >
                        <Spline scene="https://prod.spline.design/DdfkCPjmNLd7FMl7/scene.splinecode" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;






