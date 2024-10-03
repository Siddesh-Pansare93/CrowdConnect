import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import LoginRegisterForm from './components/Login';
import Signup from './components/SignUp'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GoogleOAuthProvider clientId="304995574032-iups63vm374vbran2ofgbceq3hjkg90d.apps.googleusercontent.com">
        <div>Hello</div>
      </GoogleOAuthProvider>

    </>
  )
}

export default App
