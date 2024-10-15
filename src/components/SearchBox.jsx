import { useState } from "react";
import { Query } from "appwrite";
import dbService from "@/Backend/Appwrite/DbService";
import SearchedEvents from "./SearchedEvent";
import { FiSearch } from "react-icons/fi"; // Importing the search icon

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedEvents, setSearchedEvents] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        const trimmedSearchTerm = searchTerm.trim();

        if (trimmedSearchTerm.length === 0) return;

        setIsSearching(true);
        setErrorMessage(""); // Reset error message
        setSearchedEvents([]); // Clear previous results
        try {
            const queries = [
                Query.or([
                    Query.search('eventTitle', trimmedSearchTerm),
                    Query.search('location', trimmedSearchTerm),
                    // Query.search('description', trimmedSearchTerm), // Uncomment if needed
                    Query.contains('categories', trimmedSearchTerm),
                    Query.search('ticketType', trimmedSearchTerm),
                ]),
            ];

            const searchResults = await dbService.getAllEvents(queries);
            setSearchedEvents(searchResults.documents || []);

            // If no events are found, set the error message
            if (searchResults.documents.length === 0) {
                setErrorMessage("No events found matching your search.");
            }
        } catch (error) {
            console.log("Error searching events:", error.message);
            setErrorMessage("An error occurred while searching for events.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="search-container mx-auto px-4 py-4 w-full">
            <div className="mb-4 relative">
                <form onSubmit={handleSearch} className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                    <input
                        id="search"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 px-4 focus:outline-none bg-transparent"
                        placeholder="Search for events..."
                        aria-label="Search events"
                    />
                    <FiSearch className="text-gray-400 mr-4 text-xl" />
                </form>

                {isSearching ? (
                    <p className="text-center text-white">Searching...</p>
                ) : errorMessage ? (
                    <p className="text-center text-red-500">{errorMessage}</p>
                ) : (
                    searchedEvents.length > 0 ? (
                        <SearchedEvents events={searchedEvents} />
                    ) : (
                        searchTerm && <p className="text-center text-white">No events found for your search.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchBox;
