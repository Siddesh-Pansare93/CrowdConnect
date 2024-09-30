import authService from '@/Appwrite/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as storeLogin } from '@/store/Features/authSlice';
import { useForm } from 'react-hook-form';
import Input from "./Input";

function Login() {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();


  const handleLogin = async (data) => {
    console.log("function execution started.............");
    setError('');
    try {
      console.log('Login button clicked');
      const user = await authService.login(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          console.log(userData);
          dispatch(storeLogin(userData));
          navigate('/dashboard'); // Replace with your actual route
        }
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      navigate('/home'); // Redirect on error
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <form onSubmit={handleSubmit(handleLogin)}>
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          {...register('email', { required: true })}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Password"
          {...register('password', {
            required: true,
            minLength: 8,
            validate: {
              matchPattern: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) ||
                'Password must contain at least one uppercase letter and one number',
            },
          })}
        />
        <button className="bg-cyan-400 w-full" type="submit" onClick={() => handleLogin({
          email: "test@gmail.com",
          password: "QWERTy@123"
        })}>Login</button>         {/*OnClick khali testing ke liye diya hai voh button me kuch issue hai form submit nhi ho rha hai */}
      </form>
    </div>
  );
}

export default Login;
