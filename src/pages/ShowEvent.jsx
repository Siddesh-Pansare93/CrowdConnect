import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

const EventPage = () => {
  const event = {
    name: "Tech Innovation Summit 2023",
    host: "TechCorp International",
    date: "October 15-17, 2023",
    location: "Silicon Valley Convention Center",
    description: "Join us for three days of cutting-edge technology discussions, workshops, and networking opportunities. The Tech Innovation Summit brings together industry leaders, innovators, and tech enthusiasts to explore the latest trends and breakthroughs in AI, blockchain, IoT, and more.",
    schedule: [
      { day: "Day 1", activities: "Keynote speeches, AI workshops" },
      { day: "Day 2", activities: "Blockchain seminars, IoT demonstrations" },
      { day: "Day 3", activities: "Startup pitches, Closing ceremony" }
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              className="h-full w-full object-cover md:h-full md:w-full"
              src={event.image}
              alt="Tech Innovation Summit 2023"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {event.host}
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {event.name}
            </h1>
            <p className="mt-4 text-xl text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-2" /> {event.date}
            </p>
            <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Register Now
            </button>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Details</h2>
              <p className="text-gray-600">{event.description}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Schedule</h3>
              {event.schedule.map((item, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold">{item.day}:</span> {item.activities}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600 flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {event.location}
              </p>
              <div className="mt-4 h-64 bg-gray-300 rounded-lg overflow-hidden">
                <iframe
                  title="Event Location"
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3325395304414!2d-122.01316968467769!3d37.33463524513264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb596e9e188fd%3A0x3b0d8391510688f0!2sApple%20Park!5e0!3m2!1sen!2sus!4v1621436761410!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;