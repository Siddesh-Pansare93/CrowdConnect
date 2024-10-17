import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import dbService from "@/Backend/Appwrite/DbService";
import storageService from "@/Backend/Appwrite/storageService";
import { FaUpload, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [initialImage, setInitialImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const ticketType = watch("ticketType");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const fetchedEventData = await dbService.getEvent(eventId);
        setEventData(fetchedEventData);

        // Prefill the form with event data
        setValue("eventTitle", fetchedEventData.eventTitle);
        setValue("description", fetchedEventData.description);
        setValue("location", fetchedEventData.location);
        setValue("date", fetchedEventData.date);
        setValue("startTime", fetchedEventData.startTime);
        setValue("endTime", fetchedEventData.endTime);
        setValue("ticketType", fetchedEventData.ticketType);
        setValue("ticketPrice", fetchedEventData.ticketPrice);
        setValue("tenantApproval", fetchedEventData.tenantApproval ? "yes" : "no");
        setValue("capacity", fetchedEventData.capacity);
        setValue("categories", fetchedEventData.categories);

        // Set the image preview if an image exists
        if (fetchedEventData.featuredImage) {
          const imageUrl = await storageService.getFilePreview(fetchedEventData.featuredImage);
          setImagePreview(imageUrl);
          setInitialImage(imageUrl); // Store the initial image
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId, setValue]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Update preview with the selected image
        setValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
        const { image, tenantApproval, capacity, ticketPrice, ...eventUpdateData } = data;

        // Convert tenantApproval to boolean
        eventUpdateData.tenantApproval = tenantApproval === "yes";
        console.log(image)

        // Convert ticketPrice to integer if it's provided
        if (ticketPrice) {
            eventUpdateData.ticketPrice = parseInt(ticketPrice, 10);
        }

        if (capacity) {
            eventUpdateData.capacity = parseInt(capacity, 10);
        }

        // Log eventId and the data being sent
        console.log("Event ID:", eventId);
        console.log("Event Update Data:", eventUpdateData);

        // Upload the image if a new one is provided
        if (image) {
            const file = await storageService.uploadFile(image);
            if (file) {
                eventUpdateData.featuredImage = file.$id;
            }
        }

        // Update the event in the database
        await dbService.updateEvent({ id: eventId, tenantApproval, capacity, ticketPrice,  ...eventUpdateData });
        navigate("/your-events");
    } catch (error) {
        console.error("Error updating event:", error);
    } finally {
        setIsSubmitting(false);
    }
};

  if (!eventData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050816] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-[#151030] rounded-xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left side image upload */}
          <div className="md:flex-shrink-0 md:w-1/2 bg-[#402C78] p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">Edit Your Event</h2>
              <p className="text-[#aaa6c3] mb-6">Upload a new image for your event</p>
              <div className="relative">
                {imagePreview ? (
                  <>
                    <div className="mt-6">
                      <img src={imagePreview} alt="Event preview" className="max-w-full h-auto rounded-xl shadow-md" />
                    </div>
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
                      className="cursor-pointer bg-[#151030] text-[#aaa6c3] font-semibold py-2 px-4 rounded-xl inline-flex items-center transition duration-300 ease-in-out hover:bg-indigo-600 mt-4"
                    >
                      <FaUpload className="mr-2" />
                      Change Image
                    </label>
                  </>
                ) : (
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
                      className="cursor-pointer bg-[#151030] text-[#aaa6c3] font-semibold py-2 px-4 rounded-xl inline-flex items-center transition duration-300 ease-in-out hover:bg-indigo-600"
                    >
                      <FaUpload className="mr-2" />
                      Choose Image
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right side form */}
          <div className="p-8 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="eventTitle" className="block text-sm font-medium text-[#aaa6c3]">
                  Event Title
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  {...register("eventTitle", { required: "Event title is required" })}
                  className={`mt-1 block w-full border border-gray-200 bg-[#151030] shadow-sm rounded-xl ${
                    errors.eventTitle ? "border-red-500" : "border-gray-200"
                  } text-[#aaa6c3]`}
                />
                {errors.eventTitle && (
                  <p className="mt-2 text-sm text-red-600">{errors.eventTitle.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#aaa6c3]">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  {...register("description", { required: "Description is required" })}
                  className={`mt-1 block w-full border border-gray-200 bg-[#151030] rounded-xl shadow-sm ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } text-[#aaa6c3]`}
                ></textarea>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-[#aaa6c3]">
                  Location
                </label>
                <div className="mt-1 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    {...register("location", { required: "Location is required" })}
                    className={`pl-10 block w-full border border-gray-200 bg-[#151030] rounded-xl ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    } text-[#aaa6c3]`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-[#aaa6c3]">
                    Date
                  </label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      {...register("date", { required: "Date is required" })}
                      className={`pl-10 block w-full border border-gray-200 bg-[#151030] rounded-xl ${
                        errors.date ? "border-red-500" : "border-gray-300"
                      } text-[#aaa6c3]`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-[#aaa6c3]">
                    Start Time
                  </label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="startTime"
                      {...register("startTime", { required: "Start time is required" })}
                      className={`pl-10 block w-full border border-gray-200 bg-[#151030] rounded-xl ${
                        errors.startTime ? "border-red-500" : "border-gray-300"
                      } text-[#aaa6c3]`}
                    />
                  </div>
                  {errors.startTime && (
                    <p className="mt-2 text-sm text-red-600">{errors.startTime.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-[#aaa6c3]">
                    End Time
                  </label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaClock className="text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="endTime"
                      {...register("endTime", { required: "End time is required" })}
                      className={`pl-10 block w-full border border-gray-200 bg-[#151030] rounded-xl ${
                        errors.endTime ? "border-red-500" : "border-gray-300"
                      } text-[#aaa6c3]`}
                    />
                  </div>
                  {errors.endTime && (
                    <p className="mt-2 text-sm text-red-600">{errors.endTime.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ticketType" className="block text-sm font-medium text-[#aaa6c3]">
                    Ticket Type
                  </label>
                  <select
                    id="ticketType"
                    {...register("ticketType", { required: "Ticket type is required" })}
                    className={`mt-1 block w-full border border-gray-200 bg-[#151030] rounded-xl shadow-sm ${
                      errors.ticketType ? "border-red-500" : "border-gray-300"
                    } text-[#aaa6c3]`}
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                  {errors.ticketType && (
                    <p className="mt-2 text-sm text-red-600">{errors.ticketType.message}</p>
                  )}
                </div>

                {ticketType === "paid" && (
                  <div>
                    <label htmlFor="ticketPrice" className="block text-sm font-medium text-[#aaa6c3]">
                      Ticket Price
                    </label>
                    <div className="mt-1 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRupeeSign className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="ticketPrice"
                        {...register("ticketPrice", {
                          required: "Ticket price is required",
                          valueAsNumber: true,
                        })}
                        className={`pl-10 block w-full border border-gray-200 bg-[#151030] rounded-xl ${
                          errors.ticketPrice ? "border-red-500" : "border-gray-300"
                        } text-[#aaa6c3]`}
                      />
                    </div>
                    {errors.ticketPrice && (
                      <p className="mt-2 text-sm text-red-600">{errors.ticketPrice.message}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="tenantApproval" className="block text-sm font-medium text-[#aaa6c3]">
                  Tenant Approval
                </label>
                <div className="mt-1 relative rounded-xl shadow-sm">
                  <select
                    id="tenantApproval"
                    {...register("tenantApproval")}
                    className="mt-1 block w-full border border-gray-200 bg-[#151030] rounded-xl text-[#aaa6c3]"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-[#aaa6c3]">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  {...register("capacity", {
                    valueAsNumber: true,
                    min: { value: 1, message: "Capacity must be at least 1" },
                  })}
                  className={`mt-1 block w-full border border-gray-200 bg-[#151030] rounded-xl text-[#aaa6c3]`}
                />
                {errors.capacity && (
                  <p className="mt-2 text-sm text-red-600">{errors.capacity.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#402C78] text-white font-semibold py-2 px-4 rounded-xl transition duration-300 ease-in-out hover:bg-[#3d274f] disabled:opacity-50"
                >
                  {isSubmitting ? "Updating Event..." : "Update Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
