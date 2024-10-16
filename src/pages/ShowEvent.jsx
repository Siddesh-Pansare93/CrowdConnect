import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaMoon, FaSun } from "react-icons/fa";
import Map from "@/components/Map";
import Modal from "@/components/Modal";
import RSVPForm from "@/components/RSVPForm";
import { useParams } from "react-router-dom";
import dbService from "@/Backend/Appwrite/DbService";
import storageService from "@/Backend/Appwrite/storageService";
import { motion } from 'framer-motion';
import authService from "@/Backend/Appwrite/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
    const [event, setEvent] = useState({});
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [organiserName, setOrganiserName] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function fetchEvent() {
            try {
                const event = await dbService.getEvent(id);
                setEvent(event);

                const organiser = await dbService.getUserById(event.organiser);
                setOrganiserName(organiser.name);

                // Check if user is already registered
                const currentUser = await authService.getCurrentUser();
                const user = await dbService.getUserById(currentUser.$id);
                if (user.RegisteredEvents && user.RegisteredEvents.includes(id)) {
                    setIsRegistered(true);
                }
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        }

        if (id) {
            fetchEvent();
        }
    }, [id]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const endCoords = [event.latitude, event.longitude];

    const renderCountdown = () => {
        const eventDate = new Date(event.date);
        const now = new Date();
        const timeRemaining = eventDate - now;

        if (timeRemaining < 0) {
            return (
                <motion.div
                    className="flex items-center justify-center space-x-4 mt-6 text-lg font-semibold bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-gray-800 dark:text-gray-100">
                        <span className="block">Event has started!</span>
                    </div>
                </motion.div>
            );
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);

        return (
            <motion.div
                className="flex items-center justify-center space-x-4 mt-6 text-lg font-semibold bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="text-gray-800 dark:text-gray-100">
                    <span className="block">{days}</span>
                    <span className="text-sm">Days</span>
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                    <span className="block">{hours}</span>
                    <span className="text-sm">Hours</span>
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                    <span className="block">{minutes}</span>
                    <span className="text-sm">Minutes</span>
                </div>
                <div className="text-gray-800 dark:text-gray-100">
                    <span className="block">{seconds}</span>
                    <span className="text-sm">Seconds</span>
                </div>
            </motion.div>
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setEvent((prevEvent) => ({ ...prevEvent })); // Trigger a re-render
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [event.date]);

    const handleRegistrationSuccess = () => {
        setIsRegistered(true);
        setIsRsvpModalOpen(false);
    };

    return (
        <div className={`${isDarkMode ? "dark" : ""}`}>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable pauseOnHover />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12">
                <div className="flex justify-end ">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={toggleDarkMode}
                        className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-gray-700 transition-all duration-300 focus:outline-none shadow-lg "
                    >
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </motion.button>
                </div>

                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-6">
                    <div className="md:flex items-center">
                        <motion.div
                            className="w-full md:w-1/3 md:h-48 h-48 mb-4 md:mb-0 flex-shrink-0 relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                className="w-full h-full object-cover border-4 border-indigo-500"
                                src={storageService.getFilePreview(event.featuredImage)}
                                alt={event.eventTitle}
                                style={{ borderRadius: "1rem" }}
                            />
                        </motion.div>

                        <div className="w-full md:w-2/3 md:pl-6 ">
                            <motion.div
                                className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-300 font-semibold"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Hosted BY: {organiserName}
                            </motion.div>

                            <motion.h1
                                className="mt-2 text-2xl font-bold text-gray-900 dark:text-white"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {event.eventTitle || "CrowdConnect"}
                            </motion.h1>

                            <motion.p
                                className="mt-4 text-lg text-gray-600 dark:text-gray-300 flex items-center"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <FaCalendarAlt className="mr-2" /> {event.date}
                            </motion.p>
                            <motion.p
                                className="mt-2 text-lg text-gray-600 dark:text-gray-300 flex items-center"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <FaClock className="mr-2" /> {event.startTime}
                            </motion.p>

                            {/* Display ticket price */}
                            {event.ticketPrice !== null && (
                                <motion.p
                                    className="mt-2 text-lg text-gray-600 dark:text-gray-300 flex items-center"
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <span className="font-semibold">Ticket Price:</span> ₹{event.ticketPrice}
                                </motion.p>
                            )}

                            {renderCountdown()}

                            <motion.button
                                onClick={() => setIsRsvpModalOpen(true)}
                                className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                disabled={isRegistered}
                            >
                                {isRegistered ? "You have been successfully registered for the event" : "Register Now"}
                            </motion.button>
                        </div>
                    </div>

                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Event Details</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            {event.description}
                        </p>
                    </motion.div>

                    {event.schedule && (
                        <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Schedule</h3>
                            {event.schedule.map((item, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <span className="font-semibold text-indigo-500">{item.day}:</span>
                                    <span className="text-gray-700 dark:text-gray-300">{item.activities}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Location</h3>
                        <p className="text-lg text-gray-700 dark:text-gray-300 flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> {event.location || "Not specified"}
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl shadow-xl hover:bg-blue-600 transition duration-300"
                        >
                            See Location
                        </button>
                    </motion.div>
                </div>

                <Modal isOpen={isRsvpModalOpen} onClose={() => setIsRsvpModalOpen(false)}>
                    <RSVPForm eventId={id} onCancel={() => setIsRsvpModalOpen(false)} onClose={handleRegistrationSuccess} />
                </Modal>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-xl font-bold mb-4">Location Map</h2>
                    <Map endCoords={endCoords} onClose={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </div>
    );
};

export default EventPage;
