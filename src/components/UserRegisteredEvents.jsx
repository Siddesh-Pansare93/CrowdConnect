import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dbService from '@/Backend/Appwrite/DbService'; // Assuming you have a service to fetch user data
import { Link } from 'react-router-dom';

const RegisteredEvents = () => {
    const userData = useSelector(state => state.auth.userData);
    
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            if (userData) {
                const userId = userData.$id;
                const user = await dbService.getUserById(userId);
                console.log(user);
                const registeredEvents = user.RegisteredEvents;
                const eventsData = await Promise.all(registeredEvents.map(eventId => dbService.getEvent(eventId)));
                console.log(eventsData)
                setRegisteredEvents(eventsData);
            }
        };

        fetchRegisteredEvents();
    }, [userData]);

    return (
        <div className="bg-[#050816] min-h-screen p-6">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Registered Events</h2>
            {registeredEvents?.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registeredEvents.map((event) => {
                        {if(event?.$id){
                            return (
                                <li key={event?.$id} className="bg-white bg-opacity-10 backdrop-filter h-fit backdrop-blur-md border border-white rounded-3xl p-4 shadow-2xl transition-transform transform hover:scale-105 hover:bg-bg2 hover:bg-opacity-30">
                            <h3 className="text-xl font-semibold text-white mb-2">{event?.eventTitle || "event Title"}</h3>
                            <p className="text-secondary mb-2">{event?.description}</p>
                            <p className="text-white"><strong>Date:</strong> {event?.date}</p>
                            <p className="text-white"><strong>Location:</strong> {event?.location}</p>
                            <Link to={`/event/${event?.$id}`}>
                                <button className='mt-4 bg-blue-800   text-white py-2 px-4 rounded-xl shadow-md hover:scale-105 transition duration-300'>
                                    View Event Details
                                </button>
                            </Link>
                        </li>
                            )
                        }}
                        
})}
                </ul>
            ) : (
                <p className="text-white text-lg text-center mt-4">You have not registered for any events yet.</p>
            )}
        </div>
    );
};

export default RegisteredEvents;
