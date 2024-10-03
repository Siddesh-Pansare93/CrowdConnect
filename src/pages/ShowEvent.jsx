// src/pages/EventPage.jsx
import React, { useState , useEffect  } from "react";
import { FaMapMarkerAlt, FaCalendarAlt ,FaClock } from "react-icons/fa";
import Map from "@/components/Map";
import Modal from "@/components/Modal";
import { useParams } from "react-router-dom";
import dbService from "@/Appwrite/DbService";
import storageService from "@/Appwrite/storageService";

const EventPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [event, setEvent] = useState({});
    const {id} = useParams()




    useEffect(() => {
        async function fetchEvent() {
            try {
                console.log(id);
                const event = await dbService.getEvent(id);
                console.log(event);
                setEvent(event);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        }

        if (id) {
            fetchEvent();
        }
    }, [id]);


    const endCoords = [event.latitude, event.longitude]; // Example end coordinates

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2 p-4">
                        <img
                            className="w-full h-1/2 mt-8 object-cover rounded-lg"
                            src={storageService.getFilePreview (event.featuredImage)}
                            alt={event.eventTitle}
                        />
                    </div>

                    <div className="p-8 md:w-1/2">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {event.organiser}
                        </div>
                        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            CrowdConnect
                        </h1>
                        <p className="mt-4 text-xl text-gray-500 flex items-center">
                            <FaCalendarAlt className="mr-2" /> {event.date}
                        </p>
                        <p className="mt-4 text-xl text-gray-500 flex items-center">
                            <FaClock className="mr-2" /> {event.startTime}
                        </p>
                        <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none">
                            Register Now
                        </button>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Details</h2>
                            <p className="text-gray-600">{event.description}</p>
                        </div>

                        {event.schedule && <div className="mt-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Schedule</h3>
                            {event.schedule.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <span className="font-semibold">{item.day}:</span> {item.activities}
                                </div>
                            ))}
                        </div>}

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
                <Map  endCoords={endCoords} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default EventPage;
