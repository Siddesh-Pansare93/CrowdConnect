import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaRupeeSign, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import dbService from "@/Appwrite/DbService";
import eventSlice from "@/store/Features/eventSlice";
import storageService from "@/Appwrite/storageService";
import { useSelector } from "react-redux";

const EventCreationPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const userData = useSelector(state => state.auth.userData)
  console.log(userData)

  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm({
    defaultValues: {
      eventTitle: "",
      description: "",
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      ticketType: "free",
      ticketPrice: "",
      tenantApproval: "no",
      capacity: "",
      coordinates: []
    }
  });

  const ticketType = watch("ticketType");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file)

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result)
          // if(reader.result){
          //   storageService.uploadFile(reader.result)
          // }
          ; // Set image preview
        setValue("image", file); // Store the file in form state
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulated function to convert location to coordinates
  const convertLocationToCoordinates = async (location) => {
    const apiKey = "5b3ce3597851110001cf6248ea161ad8474a473891318c69b7978604";
    const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(location)}`);

    if (!response.ok) {
      throw new Error("Failed to fetch coordinates");
    }

    const data = await response.json();

    if (data.features.length > 0) {
      const { coordinates } = data.features[0].geometry;
      const [lng, lat] = coordinates;
      return { lat, lng };
    } else {
      throw new Error("Location not found");
    }
  };


  const onSubmit = async (data) => {
    setIsSubmitting(true); 
    try {
      const { image, location, ticketPrice, tenantApproval, capacity ,  ...eventData } = data; // Destructure image and location from the form data



      // Convert location to coordinates
      const coordinates = await convertLocationToCoordinates(location);
      eventData.latitude = coordinates.lat; // Directly set coordinates
      eventData.longitude = coordinates.lng; // Directly set coordinates
      eventData.location = location



      // Upload the image to Appwrite and get the file ID or URL
      if (image) {
        const file = await storageService.uploadFile(image);
        if (file) {
          eventData.featuredImage = file.$id; 
        }
      }



      // Converting tanentApproval to boolean values 
      eventData.tenantApproval = tenantApproval === 'yes' ? true : false



      // Convert ticketPrice and capacity to a number if it's present
      if (ticketPrice) {
        eventData.ticketPrice = Number(ticketPrice);
      }
      eventData.capacity = Number(capacity)



      // Add organiser ID from user data
      eventData.organiser = userData.$id;


      console.log(eventData); 



      // Submiting the event data to the backend
      const event = await dbService.createEvent(eventData);
      if (event) {
        console.log("Event created successfully:", event);
      } else {
        console.log("Failed to create the event");
      }

    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false); 
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left side image upload */}
          <div className="md:flex-shrink-0 md:w-1/2 bg-gray-400 p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">Create Your Event</h2>
              <p className="text-black mb-6">Upload an eye-catching image for your event</p>
              <div className="relative">
                {!imagePreview ? ( // Only show input if no image is selected
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      aria-label="Upload event image"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-white text-black font-semibold py-2 px-4 rounded-lg inline-flex items-center transition duration-300 ease-in-out hover:bg-indigo-100"
                    >
                      <FaUpload className="mr-2" />
                      Choose Image
                    </label>
                  </>
                ) : (
                  <div className="mt-6">
                    <img
                      src={imagePreview}
                      alt="Event preview"
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side form */}
          <div className="p-8 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  {...register("eventTitle", { required: "Event title is required" })}
                  className={`mt-1 block w-full border border-gray-200  bg-gray-50 shadow-sm rounded-md ${errors.eventTitle ? "border-red-500" : "border-gray-200"}`}
                />
                {errors.eventTitle && (
                  <p className="mt-2 text-sm text-red-600">{errors.eventTitle.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  {...register("description", { required: "Description is required" })}
                  className={`mt-1 block w-full border border-gray-200  bg-gray-50 rounded-md shadow-sm ${errors.description ? "border-red-500" : "border-gray-300"} `}
                ></textarea>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    {...register("location", { required: "Location is required" })}
                    className={`pl-10 block w-full border border-gray-200  bg-gray-50 rounded-md ${errors.location ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      {...register("date", { required: "Date is required" })}
                      className={`pl-10 block w-full border border-gray-200  bg-gray-50 rounded-md ${errors.date ? "border-red-500" : "border-gray-300"}`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>
                <br />
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="startTime"
                      {...register("startTime", { required: "Start time is required" })}
                      className={`pl-10 block w-full border border-gray-200  bg-gray-50 rounded-md ${errors.startTime ? "border-red-500" : "border-gray-300"}`}
                    />
                  </div>
                  {errors.startTime && (
                    <p className="mt-2 text-sm text-red-600">{errors.startTime.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="endTime"
                      {...register("endTime", { required: "End time is required" })}
                      className={`pl-10 block w-full border border-gray-200  bg-gray-50 rounded-md ${errors.endTime ? "border-red-500" : "border-gray-300"} `}
                    />
                  </div>
                  {errors.endTime && (
                    <p className="mt-2 text-sm text-red-600">{errors.endTime.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700">
                    Ticket Type
                  </label>
                  <select
                    id="ticketType"
                    {...register("ticketType")}
                    className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md  "
                  >
                    <option value="free">&nbsp;&nbsp;Free</option>
                    <option value="paid">&nbsp;&nbsp;Paid</option>
                  </select>
                </div>

                {ticketType === "paid" && (
                  <div>
                    <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">
                      Ticket Price
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRupeeSign className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="ticketPrice"
                        {...register("ticketPrice", { required: "Ticket price is required" })}
                        className={`pl-10 block w-full border border-gray-200 bg-gray-50 rounded-md ${errors.ticketPrice ? "border-red-500" : "border-gray-300"} `}
                      />
                    </div>
                    {errors.ticketPrice && (
                      <p className="mt-2 text-sm text-red-600">{errors.ticketPrice.message}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  {...register("capacity", { required: "Capacity is required" })}
                  className={`mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm ${errors.capacity ? "border-red-500" : "border-gray-200"}`}
                />
                {errors.capacity && (
                  <p className="mt-2 text-sm text-red-600">{errors.capacity.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="tenantApproval" className="block text-sm font-medium text-gray-700">
                  Tenant Approval Required?
                </label>
                <select
                  id="tenantApproval"
                  {...register("tenantApproval")}
                  className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md "
                >
                  <option value="no">&nbsp;&nbsp;No</option>
                  <option value="yes">&nbsp;&nbsp;Yes</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 w-full bg-black text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Submitting..." : "Create Event"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreationPage;
