import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '@/store/Features/authSlice'
import authService from '@/Appwrite/auth'
import Input from './Input'

const SignUp = () => {
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const handleSignUp = async (data) => {
        try {
            console.log("handleSignUp..................");
            
            const user = await authService.createAccount(data)
            console.log(user)

            if (user) {
                // Await the getCurrentUser call to get user data
                const userData = await authService.getCurrentUser()
                console.log(userData)

                if (userData) {
                    dispatch(login(userData))
                    console.log("user Created Succesfully");
                    navigate('/')
                }
            }
        } catch (error) {
            // Set the error message to display
            console.log(error.message)
            navigate("/")
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
            <p>This is my SignUp page</p>
            {error && <p className="text-red-600">{error}</p>} {/* Display error if exists */}
            <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <button type="submit">
                            SignUp
                        </button>
                    </div>
                </form>
        </>
    )
}

export default SignUp
