import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import dbService from "@/Backend/Appwrite/DbService";
import { Query } from "appwrite";

// YourEventCard
import { FaHeart, FaCalendarAlt, FaUsers, FaTicketAlt } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import storageService from "@/Backend/Appwrite/storageService"; 
import authService from "@/Backend/Appwrite/auth"; 

const YourEventCard = ({ event }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            if (event.organiser) {
                const userDetails = await authService.getUserById(event.organiser);
                setUser(userDetails ? userDetails.name : "Grafana and Friends"); // Handle case when user is not found
            }
        };
        fetchUser();
    }, [event.organiser]);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-6">
            <img
                src={storageService.getFilePreview(event.featuredImage)}
                alt={event.eventTitle}
                className="w-full h-48 object-cover rounded-lg"
            />
            
            <h2 className="text-xl font-bold mt-4 mb-2">{event.eventTitle}</h2>
            <p className="text-sm text-gray-700 mb-4">Hosted by: {user || "Grafana and Friends"}</p>
            
            <div className="flex items-center mt-2 text-sm text-gray-800">
                <FaCalendarAlt className="mr-1" />
                <span>{event.date} , {event.startTime} IST</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-800">
                <FaUsers className="mr-1" />
                <span>{event.goingCount || 0} going</span>
                <span className="mx-2">|</span>
                <FaTicketAlt className="mr-1" />
                <span>{event.ticketType}</span>
            </div>
            
            <p className="text-gray-600 mt-2">{event.description || "Join us for an insightful meetup!"}</p>
            
            <div className="flex justify-between items-center mt-4">
                <Link to={`/event/${event.$id}`}>
                    <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                        View Details
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


const YourEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData); // Get userId from Redux state
    console.log(user)
    const userId = user?.$id;
    console.log(userId)

    const fetchUserEvents = async () => {
        setLoading(true);
        try {
            const queries = [Query.equal('organiser', userId)];
            console.log("Queries:", queries); 
            const userEvents = await dbService.getAllEvents(queries); // Fetch user events
            if (userEvents) {
                console.log("Fetched events:", userEvents.documents);
                setEvents(userEvents.documents); // Assuming documents contains the event list
            }
        } catch (error) {
            console.error("Failed to fetch events:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) { // Fetch only if userId is available
            console.log("Fetching events for user ID:", userId);
            fetchUserEvents();
        }
    }, [userId]);

    if (loading) {
        return <div>Loading events...</div>; // Loading state
    }

    return (
        <div className="container px-4 py-8 bg-gray-700 w-screen">
            <h1 className="text-4xl font-bold mb-8 text-center">Your Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.length > 0 ? (
                    events.map((event) => (
                        <YourEventCard key={event.$id} event={event} /> // Use $id for the key if that’s your identifier
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default YourEvents;
