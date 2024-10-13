import { useState } from "react";
import { Query } from "appwrite"; // Import Query from Appwrite SDK
import dbService from "@/Backend/Appwrite/DbService";
import SearchedEvents from "./SearchedEvent"; // Import the SearchedEvents component

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedEvents, setSearchedEvents] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form submission
        const trimmedSearchTerm = searchTerm.trim();
    
        if (trimmedSearchTerm.length === 0) return; // Do nothing if the search term is empty
    
        setIsSearching(true);
        try {
            const queries = [
                Query.or([
                    Query.search('eventTitle', trimmedSearchTerm), // Use Query.search
                    Query.search('location', trimmedSearchTerm), // Use Query.search
                    // Query.search('description', trimmedSearchTerm), // Use Query.search
                    Query.contains('categories', trimmedSearchTerm), // Use Query.search
                    Query.search('ticketType', trimmedSearchTerm), // Use Query.search
                ]),
            ];
    
            const searchResults = await dbService.getAllEvents(queries);
            console.log("Search Results:", searchResults); // For debugging
            setSearchedEvents(searchResults.documents || []);
        } catch (error) {
            console.log("Error searching events:", error.message);
            setSearchedEvents([]); // Clear the search results on error
        } finally {
            setIsSearching(false);
        }
    };
    
    
    

    return (
        <div className="search-container px-4 py-8 bg-gray-700 w-screen">
            <form onSubmit={handleSearch} className="flex justify-center mb-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 w-1/2 bg-white rounded-lg"
                    placeholder="Search for events..."
                />
                <button
                    type="submit"
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Search
                </button>
            </form>

            {isSearching ? (
                <p className="text-center text-white">Searching...</p>
            ) : (
                searchedEvents.length > 0 && (
                    <SearchedEvents events={searchedEvents} /> 
                )
            )}
        </div>
    );
};

export default SearchBox;
