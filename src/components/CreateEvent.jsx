import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUpload,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaRupeeSign,
} from "react-icons/fa";
import dbService from "@/Backend/Appwrite/DbService";
import storageService from "@/Backend/Appwrite/storageService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify' ; // For toast notifications


const EventCreationPage = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate() ;

  const userData = useSelector((state) => state.auth.userData);
  if (!userData) {
    throw new Error("Login to create post ");
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
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
      coordinates: [],
      categories: [],
    },
  });

  const ticketType = watch("ticketType");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
        setValue("image", file); // Store the file in form state
      };
      reader.readAsDataURL(file);
    }
  };

  const convertLocationToCoordinates = async (location) => {
    const apiKey =
      "5b3ce3597851110001cf6248ea161ad8474a473891318c69b7978604";
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
        location
      )}`
    );

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
    console.log(data);
    setIsSubmitting(true);
    try {
      const {
        image,
        location,
        ticketPrice,
        tenantApproval,
        capacity,
        categories,
        ...eventData
      } = data;

      // Convert location to coordinates
      const coordinates = await convertLocationToCoordinates(location);
      eventData.latitude = coordinates.lat;
      eventData.longitude = coordinates.lng;
      eventData.location = location;

      // Upload the image to Appwrite and get the file ID or URL
      if (image) {
        const file = await storageService.uploadFile(image);
        if (file) {
          eventData.featuredImage = file.$id;
        }
      }

      // Convert tenantApproval to boolean
      eventData.tenantApproval = tenantApproval === "yes" ? true : false;

      // Convert ticketPrice and capacity to a number if it's present
      if (ticketPrice) {
        eventData.ticketPrice = Number(ticketPrice);
      }
      eventData.capacity = Number(capacity);

      // Add organiser ID from user data
      eventData.organiser = userData.$id;

      // Add categories as an array
      eventData.categories = categories;

      console.log(eventData);

      // Submit the event data to the backend
      const event = await dbService.createEvent(eventData);
      if (event) {
        console.log("Event created successfully:", event);
        toast.success("Event have been successfully created");


      } else {
        console.log("Failed to create the event");
        toast.error("Failed to create event")
      } 
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsSubmitting(false);

      navigate("/your-events")
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-[#151030]  rounded-xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left side image upload */}
          <div className="md:flex-shrink-0 md:w-1/2 bg-[#402C78] p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Create Your Event
              </h2>
              <p className="text-[#aaa6c3] mb-6">
                Upload an eye-catching image for your event
              </p>
              <div className="relative">
                {!imagePreview ? (
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
                      className="cursor-pointer bg-[#151030] text-[#aaa6c3] font-semibold py-2 px-4  rounded-xl inline-flex items-center transition duration-300 ease-in-out hover:bg-indigo-600"
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
                      className="max-w-full h-auto  rounded-xl shadow-md"
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
                <label
                  htmlFor="eventTitle"
                  className="block text-sm font-medium text-[#aaa6c3]"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  {...register("eventTitle", {
                    required: "Event title is required",
                  })}
                  className={`mt-1 block w-full border border-gray-200 bg-[#151030] shadow-sm    rounded-xl ${
                    errors.eventTitle
                      ? "border-red-500"
                      : "border-gray-200"
                  } text-[#aaa6c3]`}
                />
                {errors.eventTitle && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.eventTitle.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-[#aaa6c3]"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={`mt-1 block w-full border border-gray-200 bg-[#151030]    rounded-xl shadow-sm ${
                    errors.description
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-[#aaa6c3]`}
                ></textarea>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-[#aaa6c3]"
                >
                  Location
                </label>
                <div className="mt-1 relative    rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className={`pl-10 block w-full border border-gray-200 bg-[#151030]    rounded-xl ${
                      errors.location
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-[#aaa6c3]`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-[#aaa6c3]"
                  >
                    Date
                  </label>
                  <div className="mt-1 relative    rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      {...register("date", {
                        required: "Date is required",
                      })}
                      className={`pl-10 block w-full border border-gray-200 bg-[#151030]    rounded-xl ${
                        errors.date ? "border-red-500" : "border-gray-300"
                      } text-[#aaa6c3]`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-[#aaa6c3]"
                  >
                    Start Time
                  </label>
                  <div className="mt-1 relative    rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="startTime"
                      {...register("startTime", {
                        required: "Start time is required",
                      })}
                      className={`pl-10 block w-full border border-gray-200 bg-[#151030]    rounded-xl ${
                        errors.startTime
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-[#aaa6c3]`}
                    />
                  </div>
                  {errors.startTime && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-[#aaa6c3]"
                  >
                    End Time
                  </label>
                  <div className="mt-1 relative    rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="endTime"
                      {...register("endTime", {
                        required: "End time is required",
                      })}
                      className={`pl-10 block w-full border border-gray-200 bg-[#151030]    rounded-xl ${
                        errors.endTime
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-[#aaa6c3]`}
                    />
                  </div>
                  {errors.endTime && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.endTime.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="ticketType"
                    className="block text-sm font-medium text-[#aaa6c3]"
                  >
                    Ticket Type
                  </label>
                  <select
                    id="ticketType"
                    {...register("ticketType")}
                    className="mt-1 block w-full border border-gray-200 bg-[#151030]    rounded-xl text-[#aaa6c3]"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                {ticketType === "paid" && (
                  <div>
                    <label
                      htmlFor="ticketPrice"
                      className="block text-sm font-medium text-[#aaa6c3]"
                    >
                      Ticket Price
                    </label>
                    <div className="mt-1 relative    rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRupeeSign className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="ticketPrice"
                        {...register("ticketPrice")}
                        className={`pl-10 block w-full border border-gray-200 bg-[#151030]    rounded-xl text-[#aaa6c3]`}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="tenantApproval"
                    className="block text-sm font-medium text-[#aaa6c3]"
                  >
                    Tenant Approval Required?
                  </label>
                  <select
                    id="tenantApproval"
                    {...register("tenantApproval")}
                    className="mt-1 block w-full border border-gray-200 bg-[#151030]    rounded-xl text-[#aaa6c3]"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-[#aaa6c3]"
                  >
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    {...register("capacity")}
                    className="mt-1 block w-full border border-gray-200 bg-[#151030]    rounded-xl text-[#aaa6c3]"
                  />
                </div>

                <div>
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium text-[#aaa6c3]"
                >
                  Categories
                </label>
                <select
                  id="categories"
                  {...register("categories")}
                  className="mt-1 block w-full border text-[#aaa6c3] border-gray-200 bg-[#151030]   rounded-sm shadow-sm"
                  multiple
                >
                  <option value="music">Music</option>
                  <option value="art">Art</option>
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                  <option value="sports">Sports</option>
                  <option value="gaming">Gaming</option>
                  <option value="finance">Finance</option>
                  <option value="cultural">Cultural</option>
                  <option value="social">Social</option>
                </select>
              </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#402C78] text-white font-semibold py-2 px-4    rounded-xl transition duration-300 ease-in-out hover:bg-[#3d274f] disabled:opacity-50"
                >
                  {isSubmitting ? "Creating Event..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCreationPage;