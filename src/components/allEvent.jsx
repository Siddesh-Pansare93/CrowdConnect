import { useEffect, useState } from "react";
import { FaHeart, FaUser, FaCalendarAlt, FaUsers, FaTicketAlt } from "react-icons/fa"; // Import necessary icons
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import storageService from "@/Backend/Appwrite/storageService";
import authService from "@/Backend/Appwrite/auth";
import dbService from "@/Backend/Appwrite/DbService";
import EventCard from "./EventCard";
import SearchBox from "./SearchBox";
;




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
        <div className="container  px-4 bg-[#050816] w-vh">
            <h1 className="text-4xl text-white font-bold mb-8 text-center pt-5">Latest Events</h1>
            <SearchBox/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Events;