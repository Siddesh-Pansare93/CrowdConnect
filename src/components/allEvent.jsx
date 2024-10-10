import { useEffect, useState } from "react";
import { FaHeart, FaUser, FaCalendarAlt, FaUsers, FaTicketAlt } from "react-icons/fa"; // Import necessary icons
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import storageService from "@/Backend/Appwrite/storageService";
import authService from "@/Backend/Appwrite/auth";
import dbService from "@/Backend/Appwrite/DbService";

const EventCard = ({ event }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            console.log(event.organiser);
            const userDetails = await authService.getUserById(event.organiser);
            setUser(userDetails ? userDetails.name : "Grafana and Friends"); // Handle case when user is not found
        };
        fetchUser();
    }, [event.organiser]);
    // console.log(user)

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-6">
            <img
                src={storageService.getFilePreview(event.featuredImage)}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg"
            />
            
            <h2 className="text-xl font-bold mt-4 mb-2">{event.eventTitle}</h2>
            <p className="text-sm text-gray-700 mb-4">Hosted by: {user || "Grafana and Friends"}</p>
            
            <div className="flex items-center mt-2 text-sm text-gray-800">
                <FaCalendarAlt className="mr-1" /> {/* Calendar icon */}
                <span>{event.date} , {event.startTime} IST</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-800">
                <FaUsers className="mr-1" /> {/* Users icon */}
                <span>200 going</span>
                <span className="mx-2">|</span> {/* Separator */}
                <FaTicketAlt className="mr-1" /> {/* Ticket icon */}
                <span>{event.ticketType}</span>
            </div>
            
            <p className="text-gray-600 mt-2">{event.description || "Join us for an insightful meetup!"}</p>
            
            <div className="flex justify-between items-center mt-4">
                <Link to={`/event/${event.$id}`}>
                    <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                        Read More
                    </button>
                </Link>
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
                        isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                    aria-label={isLiked ? "Unlike event" : "Like event"}
                >
                    <FaHeart />
                </button>
            </div>
        </div>
    );
};




const Events = () => {

    const [events, setEvents] = useState([])
    const dispatch = useDispatch()
    console.log(events);


    const fetchallEvents = async () => {
        try {
            await dbService.getAllEvents().then(
                (allevents) => {
                    if (allevents) {
                        setEvents(allevents.documents)
                        dispatch(allevents.documents)
                    }
                }
            )
        } catch (error) {
            console.log(error.message);

        }
    }

    useEffect(() => {
        fetchallEvents()
    }, [])



    return (
        <div className="container  px-4 py-8 bg-gray-700 w-screen">
            <h1 className="text-4xl font-bold mb-8 text-center">Latest Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Events;