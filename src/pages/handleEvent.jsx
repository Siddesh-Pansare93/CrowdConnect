import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCheck, FaTimes } from "react-icons/fa";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { useParams } from "react-router-dom"; // For accessing eventId from URL
import dbService from "../Backend/Appwrite/DbService"; // Assuming dbService has methods for event fetching
import storageService from "../Backend/Appwrite/storageService";
import authService from "../Backend/Appwrite/auth";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";

const EventManager = () => {
  const { eventId } = useParams(); // Fetch eventId from the URL
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("registration");
  const [registrations, setRegistrations] = useState([]); // Array of user IDs
  const [attendees, setAttendees] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [users, setUsers] = useState({}); // Object to hold user details
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    // Fetch event details, registrations, and attendees when the component mounts
    const fetchEventData = async () => {
      try {
        // Fetch event details
        const event = await dbService.getEvent(eventId);
        setEventDetails(event);
        console.log("Fetched Event Details:", event); // Log event details for debugging
  
        // Set registrations as user IDs
        setRegistrations(event.registrations || []);
  
        // Fetch user details for all registered users
        const userPromises = event.registrations.map(userId => authService.getUserById(userId));
        const userDetails = await Promise.all(userPromises);
        const userDetailsMap = userDetails.reduce((acc, user) => {
          if (user) {
            acc[user.id] = user; // Create a map of user details
          }
          return acc;
        }, {});
        setUsers(userDetailsMap); // Set user details in state
  
        // Fetch attendees details (approved users)
        const attendeePromises = event.attendees.map(userId => authService.getUserById(userId));
        const attendeeDetails = await Promise.all(attendeePromises);
        setAttendees(attendeeDetails); // Set the attendees list
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
  
    fetchEventData();
  }, [eventId]); // Fetch event data when eventId changes
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

// Function to send confirmation email
const sendConfirmationEmail = (userEmail, userName, eventTitle) => {
  const templateParams = {
    to_name: userName,
    to_email: userEmail,
    event_name: eventTitle,
  };

  emailjs
    .send(
      "service_urnjv47", // Replace with your EmailJS service ID
      "template_frpp7dt", // Replace with your EmailJS template ID
      templateParams,
      "sTkbtnTzVWr4EoiBs" // Replace with your EmailJS user ID
    )
    .then(
      (response) => {
        console.log("Confirmation email sent successfully:", response.status, response.text);
      },
      (error) => {
        console.error("Failed to send confirmation email:", error);
      }
    );
};

const onEdit = async () => {
  navigate(`/edit-event/${eventDetails.$id}`);
}

const onDelete = async () => {
  try {
    await dbService.deleteEvent(eventId);
    navigate("/your-events")
    console.log("Event deleted successfully.");
  } catch (error) {
    console.error("Error deleting event:", error);
  }
};


  const handleRegistration = async (action, userId) => {
    try {
      // Update registration status in the backend
      await dbService.updateRegistrationStatus(eventId, userId, action);

      // Update local state after successful backend update
      const updatedRegistrations = registrations.filter((regId) => regId !== userId);
      setRegistrations(updatedRegistrations);

      if (action === "approved") {
        // Fetch the user details to add to attendees
        const user = users[userId]; // Use the user details stored in state
        if (user) {
          // Add user to attendees
          await dbService.addUserToEventAttendees(eventId, userId);
          setAttendees([...attendees, user]); // Add the approved user to the attendees list
          sendConfirmationEmail(user.email, user.name, eventDetails.eventTitle);
        }
      }
    } catch (error) {
      console.error("Error updating registration:", error);
    }
  };

  if (!eventDetails) {
    return <div>Loading event data...</div>;
  }

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Manage Event</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? "bg-yellow-400 text-gray-900" : "bg-gray-800 text-white"}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
        <div className="mb-12 p-6 dark:bg-gray-800 rounded-2xl shadow-lg text-white h-fit">
  <h2 className="text-3xl font-semibold mb-4 pl-3">{eventDetails.eventTitle}</h2>
  <div className="flex flex-col items-center mb-4">
    <img
      src={storageService.getFilePreview(eventDetails.featuredImage)}
      alt={eventDetails.title}
      className="w-full md:w-3/4 h-48 object-cover rounded-xl mb-4"
    />
    <div className="text-center mb-4">
      <p className="mb-2"><strong>Date:</strong> {eventDetails.date}</p>
      <p className="mb-2"><strong>Location:</strong> {eventDetails.location}</p>
      <p className="mb-2"><strong>Description:</strong> {eventDetails.description}</p>
    </div>
  </div>
  <div className="flex justify-between items-center">
  <button
    onClick={onEdit}
    className="flex items-center bg-green-500 text-white font-semibold py-2 px-4 rounded-xl shadow-xl hover:bg-green-600 transition duration-200">
    <MdOutlineEdit className="mr-2" />
    Edit
  </button>
  <button
    onClick={onDelete}
    className="flex items-center bg-red-500 text-white font-semibold py-2 px-4 rounded-xl shadow-xl hover:bg-red-600 transition duration-200">
    <MdDelete className="mr-2" />
    Delete
  </button>
</div>

</div>



          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <div className="flex mb-4 gap-2">
              <button
                onClick={() => setActiveTab("registration")}
                className={`flex-1 py-2 px-4 rounded-xl ${activeTab === "registration" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                Registration
              </button>
              <button
                onClick={() => setActiveTab("attendees")}
                className={`flex-1 py-2 px-4 rounded-xl ${activeTab === "attendees" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                Attendees
              </button>
            </div>

            {activeTab === "registration" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Pending Registrations</h3>
                <ul className="space-y-4">
                  {registrations.length > 0 ? (
                    registrations.map((userId) => {
                      const user = users[userId]; // Get user details using the ID
                      return (
                        <li key={userId} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                          <div>
                            <p className="font-semibold">{user ? user.name : "Loading..."}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user ? user.email : "Loading..."}</p>
                          </div>
                          <div className="space-x-2">
                            <button
                              onClick={() => handleRegistration("approved", userId)}
                              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                              aria-label={`Approve ${user ? user.name : "User"}`}
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleRegistration("declined", userId)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                              aria-label={`Decline ${user ? user.name : "User"}`}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <p>No pending registrations</p>
                  )}
                </ul>
              </div>
            )}

            {activeTab === "attendees" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Approved Attendees</h3>
                <ul className="space-y-4">
                  {attendees.length > 0 ? (
                    attendees.map((attendee) => (
                      <li key={attendee?.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl">
                        <p className="font-semibold">{attendee?.name }</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{attendee?.email}</p>
                      </li>
                    ))
                  ) : (
                    <p>No attendees yet</p>
                  )}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventManager;
