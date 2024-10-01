import React, { useState, useEffect } from "react";
import { FaImage, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt, FaUsers, FaCheck, FaTimes } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";

const CreateEventPage = () => {
  const [eventData, setEventData] = useState({
    image: null,
    name: "",
    description: "",
    location: "",
    startDateTime: "",
    endDateTime: "",
    ticketType: "free",
    ticketPrice: "",
    approvalRequired: false,
    capacity: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!eventData.image) newErrors.image = "Event image is required";
    if (!eventData.name.trim()) newErrors.name = "Event name is required";
    if (!eventData.description.trim()) newErrors.description = "Description is required";
    if (!eventData.location.trim()) newErrors.location = "Location is required";
    if (!eventData.startDateTime) newErrors.startDateTime = "Start date and time are required";
    if (!eventData.endDateTime) newErrors.endDateTime = "End date and time are required";
    if (eventData.ticketType === "paid" && !eventData.ticketPrice.trim()) {
      newErrors.ticketPrice = "Ticket price is required for paid events";
    }
    if (!eventData.capacity.trim()) newErrors.capacity = "Capacity is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Event created:", eventData);
      setIsSubmitting(false);
      // Reset form or navigate to a new page
    }
  };

  useEffect(() => {
    // Announce errors to screen readers
    const errorMessages = Object.values(errors).join(", ");
    if (errorMessages) {
      const announcement = new SpeechSynthesisUtterance("Form errors: " + errorMessages);
      window.speechSynthesis.speak(announcement);
    }
  }, [errors]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row">
          {/* Image Upload Section */}
          <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col justify-center items-center">
            <div
              className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative"
              aria-label="Event image upload area"
            >
              {eventData.image ? (
                <img
                  src={eventData.image}
                  alt="Event preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaImage className="text-gray-400 text-5xl" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload event image"
              />
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-2" role="alert">
                {errors.image}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">Click to upload or drag and drop</p>
          </div>

          {/* Form Fields Section */}
          <div className="md:w-2/3 p-8">
            <h2 className="text-2xl font-bold mb-6">Create Your Event</h2>

            <div className="space-y-6">
              {/* Event Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={eventData.name}
                    onChange={handleInputChange}
                    className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md ${errors.name ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="Enter event name"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaTimes className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600" id="name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={eventData.description}
                    onChange={handleInputChange}
                    className={`shadow-sm block w-full focus:outline-none sm:text-sm rounded-md ${errors.description ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="Describe your event"
                    aria-invalid={errors.description ? "true" : "false"}
                    aria-describedby={errors.description ? "description-error" : undefined}
                  ></textarea>
                </div>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600" id="description-error">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={eventData.location}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${errors.location ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="Enter event location"
                    aria-invalid={errors.location ? "true" : "false"}
                    aria-describedby={errors.location ? "location-error" : undefined}
                  />
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600" id="location-error">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-700">
                    Start Date & Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="datetime-local"
                      name="startDateTime"
                      id="startDateTime"
                      value={eventData.startDateTime}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${errors.startDateTime ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                      aria-invalid={errors.startDateTime ? "true" : "false"}
                      aria-describedby={errors.startDateTime ? "startDateTime-error" : undefined}
                    />
                  </div>
                  {errors.startDateTime && (
                    <p className="mt-2 text-sm text-red-600" id="startDateTime-error">
                      {errors.startDateTime}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="endDateTime" className="block text-sm font-medium text-gray-700">
                    End Date & Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="datetime-local"
                      name="endDateTime"
                      id="endDateTime"
                      value={eventData.endDateTime}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${errors.endDateTime ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                      aria-invalid={errors.endDateTime ? "true" : "false"}
                      aria-describedby={errors.endDateTime ? "endDateTime-error" : undefined}
                    />
                  </div>
                  {errors.endDateTime && (
                    <p className="mt-2 text-sm text-red-600" id="endDateTime-error">
                      {errors.endDateTime}
                    </p>
                  )}
                </div>
              </div>

              {/* Ticket Type */}
              <div>
                <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700">
                  Ticket Type
                </label>
                <div className="mt-1">
                  <select
                    id="ticketType"
                    name="ticketType"
                    value={eventData.ticketType}
                    onChange={handleInputChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>

              {/* Ticket Price (only if paid) */}
              {eventData.ticketType === "paid" && (
                <div>
                  <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">
                    Ticket Price
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BsCurrencyDollar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="number"
                      name="ticketPrice"
                      id="ticketPrice"
                      value={eventData.ticketPrice}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 focus:outline-none sm:text-sm rounded-md ${errors.ticketPrice ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                      placeholder="Enter ticket price"
                      aria-invalid={errors.ticketPrice ? "true" : "false"}
                      aria-describedby={errors.ticketPrice ? "ticketPrice-error" : undefined}
                    />
                  </div>
                  {errors.ticketPrice && (
                    <p className="mt-2 text-sm text-red-600" id="ticketPrice-error">
                      {errors.ticketPrice}
                    </p>
                  )}
                </div>
              )}

              {/* Approval Required */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="approvalRequired"
                  id="approvalRequired"
                  checked={eventData.approvalRequired}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="approvalRequired" className="ml-2 block text-sm font-medium text-gray-700">
                  Approval required for attending
                </label>
              </div>

              {/* Capacity */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="capacity"
                    id="capacity"
                    value={eventData.capacity}
                    onChange={handleInputChange}
                    className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md ${errors.capacity ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="Enter event capacity"
                    aria-invalid={errors.capacity ? "true" : "false"}
                    aria-describedby={errors.capacity ? "capacity-error" : undefined}
                  />
                  {errors.capacity && (
                    <p className="mt-2 text-sm text-red-600" id="capacity-error">
                      {errors.capacity}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? "Submitting..." : "Create Event"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
