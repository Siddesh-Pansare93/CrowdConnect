import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import '../src/index.css'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store  from './store/store.js'
import { PersistGate } from "redux-persist/integration/react";

import CreateEventPage from './components/CreateEvent.jsx'
import LoginRegisterForm from './pages/login.jsx'
import Events from './components/allEvent.jsx'
import ShowEvent from './pages/ShowEvent.jsx'
import Home from './pages/Home.jsx'
import Payment from './components/Payment.jsx'
import Logout from './components/Header/Logout.jsx'
import YourEvents from './pages/yourevent.jsx'
import About from './pages/About.jsx'
import OTPVerification from './pages/Verify.jsx'
import ProfileSettings from './components/ProfileSettings'
import EventManager from './pages/handleEvent.jsx'
import SearchedEvents from './components/SearchedEvent'
import Layout from './layouts/Layout'
import RegisteredEvents from './components/UserRegisteredEvents'
// import NormalEvent  from './pages/NormalEvent'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* <Route path='/showevent' element={<EventPage/>}/> */}
      <Route path='/' element={<Home />} />
      <Route path='/About' element={<About />} />
      <Route path='/login' element={<LoginRegisterForm/>} />
      <Route path='/signup' element={<LoginRegisterForm />} />
      <Route path='/createevent' element={<CreateEventPage />} />
      <Route path='/allevents' element={<Events />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/logout" element={<Logout />} />
      <Route path='/your-events' element={<YourEvents/>}/>
      <Route path='/event/:id' element={<ShowEvent/>}/>
      <Route path='/otp-verification' element={<OTPVerification/>}/>
      <Route path='/profile-settings' element={<ProfileSettings/>}/>
      <Route path='/EventManager/:eventId' element={<EventManager/>}/>
      <Route path="/registered-events" element={<RegisteredEvents/>} />
      {/* <Route path= "/normalevents" element ={<NormalEvent/>} /> */}

      <Route path="/search" element={<SearchedEvents/>} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* PersistGate delays rendering until the persisted state has been loaded */}
   
      <RouterProvider router={router} />
  
  </Provider>,

)