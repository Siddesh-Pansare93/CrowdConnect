import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FiUpload, FiCalendar, FiClock, FiDollarSign, FiUsers } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import EventSlice, { setAllEvents } from "@/store/Features/eventSlice";
import { useDispatch } from "react-redux";
import dbService, { DbService } from "@/Appwrite/DbService";

const CreateEventPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { control, handleSubmit, watch, formState: { errors }, setValue, register } = useForm({
    defaultValues: {
      featuredImage: null,
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      ticketType: "free",
      price: "",
      tenantApproval: false,
      capacity: "",
    }
  });

  const ticketType = watch("ticketType");
  const dispatch = useDispatch()


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const event = await dbService.createEvent(data)
      if (event) {
        dispatch(setAllEvents(event))
        console.log(event)
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <div className="h-64 md:h-full relative bg-gray-100 flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Event preview"
                  className="h-1/2 w-full object-cover mt-0 mx-4 rounded-lg"
                />
              ) : (
                <div className="text-center p-6">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Upload event image</p>
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
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>
          <div className="p-8 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Event name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  )}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <input
    type="datetime-local"
    {...register("Start_date_time", { required: true })}
    placeholder="Start Date and Time"
  />
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "Event description is required" }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="description"
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    ></textarea>
                  )}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdLocationOn className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: "Event location is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        id="location"
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    )}
                  />
                </div>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
              </div>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      name="date"
                      control={control}
                      rules={{ required: "Event date is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          id="date"
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      )}
                    />
                  </div>
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiClock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      name="time"
                      control={control}
                      rules={{ required: "Event time is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="time"
                          id="time"
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      )}
                    />
                  </div>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
                <div className="mt-2 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <Controller
                    name="ticketType"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className="flex items-center">
                          <input
                            {...field}
                            id="free"
                            type="radio"
                            value="free"
                            checked={field.value === "free"}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="free" className="ml-3 block text-sm font-medium text-gray-700">
                            Free
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            {...field}
                            id="paid"
                            type="radio"
                            value="paid"
                            checked={field.value === "paid"}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="paid" className="ml-3 block text-sm font-medium text-gray-700">
                            Paid
                          </label>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>

              {ticketType === "paid" && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Ticket Price (₹)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      name="price"
                      control={control}
                      rules={{ required: "Ticket price is required for paid events" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          id="price"
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      )}
                    />
                  </div>
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
              )}

              <div>
                <div className="flex items-center">
                  <Controller
                    name="tenantApproval"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="tenantApproval"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    )}
                  />
                  <label htmlFor="tenantApproval" className="ml-2 block text-sm text-gray-700">
                    Tenant Approval Required
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Event Capacity
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUsers className="h-5 w-5 text-gray-400" />
                  </div>
                  <Controller
                    name="capacity"
                    control={control}
                    rules={{ required: "Event capacity is required" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        id="capacity"
                        className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    )}
                  />
                </div>
                {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Create Event"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
