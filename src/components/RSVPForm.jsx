import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import dbService from '@/Backend/Appwrite/DbService';

const RSVPForm = ({ onClose, eventId, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [event, setEvent] = useState({});
    const userData = useSelector(state => state.auth.userData);
    const [isPaidEvent, setIsPaidEvent] = useState(false); // Check if event is paid
    const [isRegistered, setIsRegistered] = useState(false);

    // Fetch Event Details
    useEffect(() => {
        const fetchEvent = async (eventId) => {
            const eventData = await dbService.getEvent(eventId);
            setEvent(eventData);
            setIsPaidEvent(eventData.ticketPrice > 0); // Check if event is paid
        };
        fetchEvent(eventId);
    }, [eventId]);

    // Function to open Razorpay payment gateway
    const openPaymentGateway = async (amount, onSuccess) => {
        const options = {
            key: "rzp_test_9TB3asShG3RvdV", // Razorpay key from env
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            name: event.eventTitle,
            description: 'Event Registration Payment',
            handler: onSuccess, // Function to call after successful payment
            prefill: {
                name: userData.name,
                email: userData.email,
            },
            theme: {
                color: '#F37254',
            },
        };
        
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    // Form Submission Handler
    const onSubmit = async (data) => {
        if (isPaidEvent) {
            // Open Razorpay payment gateway with event price
            openPaymentGateway(event.ticketPrice, async (response) => {
                try {
                    // After successful payment, add user directly to attendees
                    await dbService.addUserToEventAttendees(eventId, userData.$id); // Add to attendees directly
                    // Add event ID to user's registered events
                    await dbService.addEventToUserRegisteredEvents(userData.$id, eventId);

                    
                    // Send email notification
                    const templateParams = {
                        event_name: event.eventTitle,
                        user_name: userData.name,
                        event_date: event.date,
                        event_time: event.startTime,
                        organisation_name: event.organiser,
                        event_location: event.location,
                        user_email: data.email,
                    };

                    await emailjs.send(
                        'service_urnjv47',
                        'template_gcil1w8', // Assuming this is the template for confirmation
                        templateParams,
                        'sTkbtnTzVWr4EoiBs'
                    );

                    // Show success message
                    toast.success("You have been successfully registered for the event! Check your email for further details.");
                    
                    onClose(); // Close the form after success
                } catch (error) {
                    console.error('Failed to register:', error);
                    toast.error("Failed to register. Please try again later.");
                }
            });
        } else {
            // Free event: Add user to the registrations array
            try {
                await dbService.addUserToEventRegistrations(eventId, userData.$id); // Add to registrations array
                // Add event ID to user's registered events
                await dbService.addEventToUserRegisteredEvents(userData.$id, eventId);


                // Send email notification
                const templateParams = {
                    event_name: event.eventTitle,
                    user_name: userData.name,
                    event_date: event.date,
                    event_time: event.startTime,
                    organisation_name: "CrowdConnect",
                    event_location: event.location,
                    user_email: data.email,
                };

                await emailjs.send(
                    'service_eq3m2ed',
                    'template_j77s0ym', // Assuming this is the template for confirmation
                    templateParams,
                    '152Q6uG2K9dkInbrZ'
                );

                // Show success message
                toast.success("You have been successfully registered for the event! Check your email for further details.");
                
                onClose(); // Close the form after success
            } catch (error) {
                console.error('Failed to register:', error);
                toast.error("Failed to register. Please try again later.");
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold mb-4">RSVP for Event</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Social Media Platform</label>
                        <input
                            type="text"
                            {...register('socialMedia', { required: true })}
                            className={`border ${errors.socialMedia ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full p-2`}
                        />
                        {errors.socialMedia && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email ID</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full p-2`}
                        />
                        {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Why do you want to attend?</label>
                        <textarea
                            {...register('reason', { required: true })}
                            className={`border ${errors.reason ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full p-2`}
                        />
                        {errors.reason && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-300 text-black rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                            {isPaidEvent ? "Pay and Submit" : "Submit"}
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RSVPForm;
