// YourEvents.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import dbService from "@/Backend/Appwrite/DbService";
import { Query } from "appwrite";
import YourEventCard from "./EventCard"; // Import the new component

const YourEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData);
    const userId = user?.$id;

    const fetchUserEvents = async () => {
        setLoading(true);
        try {
            const queries = [Query.equal('organiser', userId)];
            const userEvents = await dbService.getAllEvents(queries);
            if (userEvents) {
                setEvents(userEvents.documents);
            }
        } catch (error) {
            console.error("Failed to fetch events:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserEvents();
        }
    }, [userId]);

    if (loading) {
        return <div>Loading events...</div>;
    }
// css for the YOUREVENTS page
    return (
        <div className="container px-4 py-8 bg- w-vw">
            <h1 className="text-4xl font-bold mb-8 text-center">Your Events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.length > 0 ? (
                    events.map((event) => (
                        <YourEventCard key={event.$id} event={event} />
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default YourEvents;
