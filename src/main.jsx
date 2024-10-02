import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/layout.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Postcard from './components/Postcard.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import EventPage from './pages/ShowEvent.jsx'
import CreateEventPage from './pages/CreateEvent.jsx'
import LoginRegisterForm from './pages/login.jsx'
import Events from './pages/Event.jsx'
import ShowEvent from './pages/ShowEvent.jsx'
import Logout from './components/Header/Logout.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      {/* <Route path='/showevent' element={<EventPage/>}/> */}

      <Route path='/logout' element={<Logout/>}/>
      <Route path='/signUp' element={<LoginRegisterForm/>}/>
      <Route path='/createevent' element={<CreateEventPage/>}/>
      <Route path='/allevent' element={<Events/>}/>
      <Route path='/showEvent' element={<ShowEvent/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  
)
