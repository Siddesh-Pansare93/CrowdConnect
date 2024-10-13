import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify'; // For toast notifications
import dbService from '@/Backend/Appwrite/DbService'; // Assuming you have a service to update your event

const RSVPForm = ({ onClose, eventId ,onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [event, setEvent] = useState({});
    const userData = useSelector(state => state.auth.userData);
    const [template, setTemplate] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const fetchEvent = async (eventId) => {
            const event = await dbService.getEvent(eventId);
            setEvent(event);
        };
        fetchEvent(eventId);
    }, [eventId]);

    useEffect(() => {
        if (event.tenantApproval) {
            setTemplate("template_j77s0ym");
        } else {
            setTemplate("");
        }
    }, [event.tenantApproval]);

    const onSubmit = async (data) => {
        const templateParams = {
            event_name: event.eventTitle,
            user_name: userData.name,
            event_date: event.date,
            event_time: event.startTime,
            organisation_name: "CrowdConnect",
            event_location: event.location,
            user_email: data.email,
        };
    
        try {
            await emailjs.send(
                'service_eq3m2ed',
                template,
                templateParams,
                '152Q6uG2K9dkInbrZ'
            );
    
            // Show success message
            toast.success("You have been successfully registered for the event! Check your email for further details.");
    
            // Register the user for the event in your database
            await dbService.addUserToEventRegistrations(eventId, userData.$id); // Assuming you have a method to do this
            
            // Add event ID to user's registered events
            await dbService.addEventToUserRegisteredEvents(userData.$id, eventId);
    
            // Close the form
            setIsRegistered(true);
            onClose(); // This will close the RSVP form
        } catch (error) {
            console.error('Failed to send mail:', error);
            toast.error("Failed to register. Please try again later.");
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
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg" disabled={isRegistered}>
                            {isRegistered ? "You have been registered for the event" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RSVPForm;
