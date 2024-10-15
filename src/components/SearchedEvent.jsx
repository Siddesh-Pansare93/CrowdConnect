import EventCard from "../components/EventCard"; // Import the EventCard component

const SearchedEvents = ({ events }) => {
    return (
        <div className="container mx-auto  bg-transparent"> {/* Center but allow full width */}
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Search Results</h2>
            {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"> {/* Full width grid */}
                    {events.map((event) => (
                        <EventCard key={event.$id} event={event} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-white">No events found matching your search.</p>
            )}
        </div>
    );
};

export default SearchedEvents;
