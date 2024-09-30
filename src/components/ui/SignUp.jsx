import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '@/store/Features/authSlice'
import authService from '@/Appwrite/auth'
import Input from '../Input'

function SignUp() {
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const handleSignUp = async (data) => {
        try {
            const user = authService.CreateAccount(data)
            console.log(user)
            if (user) {
                const userData = authService.getCurrentUser()
                console.log(userData)
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
            navigate("/")
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <p>This is my SignUP page </p>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <Input
                    type='text'
                    label="Username"
                    placeholder="Username"
                    {...register('username', { required: true })}
                />

                <Input type="Email"
                    label="Email"
                    placeholder="Email"
                    {...register("email", {
                        required: true,

                    })}
                />

                <Input
                    type="Password"
                    label="Password"
                    placeholder="Password"
                    {...register("password", {
                        required: true,
                        minLength: 8,
                        validate: {
                            matchPattern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "Password must contain atleast one uppercase letter and one number "
                        }
                    })}
                />
            </form>
        </div>
    )
}

export default SignUp