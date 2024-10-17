import { useEffect, useState } from "react";
import { FaHeart, FaCalendarAlt, FaUsers, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import storageService from "@/Backend/Appwrite/storageService";
import authService from "@/Backend/Appwrite/auth";

const YourEventCard = ({ event }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState("Grafana and Friends");

    useEffect(() => {
        const fetchUser = async () => {
            if (event.organiser) {
                const userDetails = await authService.getUserById(event.organiser);
                setUser(userDetails ? userDetails.name : "Grafana and Friends");
            }
        };
        fetchUser();
    }, [event.organiser]);

    return (
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-95 p-6 border-5 h-fit">
            <img
                src={storageService.getFilePreview(event.featuredImage)}
                alt={event.eventTitle}
                className="w-full h-48 object-cover rounded-xl"
            />
            <h2 className="text-xl text-white font-bold mt-4 mb-2">{event.eventTitle}</h2>
            <p className="text-sm text-white mb-4">Hosted by: {user}</p>

            <div className="flex items-center mt-2 text-sm text-white">
                <FaCalendarAlt className="mr-1" />
                <span>{event.date} , {event.startTime} IST</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-white">
                <FaUsers className="mr-1" />
                <span>{event.attendees.length || 0} going</span>
                <span className="mx-2">|</span>
                <FaTicketAlt className="mr-1" />
                <span>{event.ticketType}</span>
                {/* Conditionally display ticket price if the type is paid */}
                {event.ticketType === 'paid' && (
                    <span className="ml-2 text-yellow-400">₹{event.ticketPrice}</span>
                )}
            </div>

            <p className="text-white mt-2">{event.description || "Join us for an insightful meetup!"}</p>

            <div className="flex justify-between items-center mt-4">
                <Link to={`/event/${event.$id}`}>
                    <button className="bg-gray-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                        View Details
                    </button>
                </Link>
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                    aria-label={isLiked ? "Unlike event" : "Like event"}
                >
                    <FaHeart />
                </button>
            </div>
        </div>
    );
};

export default YourEventCard;
