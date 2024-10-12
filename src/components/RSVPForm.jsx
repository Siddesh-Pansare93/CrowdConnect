import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import dbService from '@/Backend/Appwrite/DbService';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';


const RSVPForm = ({ onClose, eventId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [event, setEvent] = useState({});
    const userData = useSelector(state => state.auth.userData);
    const [template , setTemplate] = useState('')

    useEffect(() => {
        console.log(userData); // Log userData when it changes

        // Event data fetch logic
        const fetchEvent = async (eventId) => {
            console.log(eventId);
            const event = await dbService.getEvent(eventId);
            console.log(event)
            setEvent(event);
        };
        fetchEvent(eventId);
    }, [eventId, userData]);

    const onSubmit = async (data) => {
        console.log(data);  // Log form data

        // Sending mail logic (emailjs or other)
        const templateParams = {
            event_name : event.eventTitle  , 
            user_name : userData.name , 
            event_date : event.date , 
            event_time : event.startTime , 
            organisation_name :"CrowdConnect" ,
            event_location : event.location ,
            user_email : data.email
        };

        if(event.tenantApproval){
            setTemplate("template_j77s0ym")
            console.log(template)
        }else{
            setTemplate("")
            console.log(template)

        }



        try {
            
             emailjs.send(
              'service_eq3m2ed',  // Replace with your EmailJS service ID
              template, // Replace with your EmailJS template ID
              templateParams,
              '152Q6uG2K9dkInbrZ'   // Replace with your EmailJS public key
            );
            console.log('Mail send to email');
          } catch (error) {
            console.error('Failed to send mail:', error);
          }

        onClose();  // Close the form on submit
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
                        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 text-black rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RSVPForm;
