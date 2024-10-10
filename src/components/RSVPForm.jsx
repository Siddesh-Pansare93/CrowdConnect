// src/components/RSVPForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

const RSVPForm = ({ onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Handle form submission, e.g., send data to an API
        emailjs.send('service_o1k03ot', 'template_jc873aq', formData, 'fbxLzbBncfCIVbQwF')
            .then((response) => {
                console.log('Email sent successfully:', response);
                // Reset form data
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
                alert("Your message has been sent!");
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert("There was an error sending your message. Please try again later.");
            });
        onClose(); // Close the form after submission
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

// Export the component as default
export default RSVPForm;
