// src/pages/EventPage.jsx
import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Map from "@/components/Map";
import Modal from "@/components/Modal";

const EventPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const event = {
        name: "Tech Innovation Summit 2023",
        host: "TechCorp International",
        date: "October 15-17, 2023",
        location: "Silicon Valley Convention Center",
        description: "Join us for three days of cutting-edge technology discussions, workshops, and networking opportunities.",
        schedule: [
            { day: "Day 1", activities: "Keynote speeches, AI workshops" },
            { day: "Day 2", activities: "Blockchain seminars, IoT demonstrations" },
            { day: "Day 3", activities: "Startup pitches, Closing ceremony" }
        ],
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    };

    const startCoords = [19.1987712, 72.957952]; // Example start coordinates
    const endCoords = [19.013020, 72.844650]; // Example end coordinates

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2 p-4">
                        <img
                            className="w-full h-1/2 mt-8 object-cover rounded-lg"
                            src={event.image}
                            alt="Tech Innovation Summit 2023"
                        />
                    </div>

                    <div className="p-8 md:w-1/2">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {event.host}
                        </div>
                        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {event.name}
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 flex items-center">
                            <FaCalendarAlt className="mr-2" /> {event.date}
                        </p>
                        <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none">
                            Register Now
                        </button>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Details</h2>
                            <p className="text-gray-600">{event.description}</p>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Schedule</h3>
                            {event.schedule.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <span className="font-semibold">{item.day}:</span> {item.activities}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
                            <p className="text-gray-600 flex items-center">
                                <FaMapMarkerAlt className="mr-2" /> {event.location}
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                See Location
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for displaying the map */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Location Map</h2>
                <Map startCoords={startCoords} endCoords={endCoords} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default EventPage;
