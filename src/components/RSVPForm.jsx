// src/components/RSVPForm.jsx
import React, { useEffect ,useState  ,useMemo} from 'react';
import { useForm } from 'react-hook-form';
import  emailjs from 'emailjs-com';
import dbService from '@/Backend/Appwrite/DbService';
import { useSelector } from 'react-redux';

const RSVPForm = ({ onClose , eventId } ) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [event, setEvent] = useState({})
    const [userData , setUserData] =  useState({})
   
    const storeUserData = useMemo(()=>{
        const userData = useSelector(state => state.auth.userData)
        console.log(userData);
    } , [userData])

    storeUserData()
   
    

    useEffect(()=>{
        // Event ka data chaiye 
        const fetchEvent =async(eventId)=>{
        console.log(eventId)
        const event  = await dbService.getEvent(eventId)
        setEvent(event)
        }
        fetchEvent(eventId)
        console.log(event)

        

    } ,[eventId])
    
    

    const onSubmit = (data) => {
        console.log(data); 

        //Sending mail to user 

        const templateParams  = {

        }
       
        
        onClose(); 
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
