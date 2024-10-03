import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/layout.jsx'
import { Provider } from 'react-redux'
import store ,{persistor} from './store/store.js'
import { PersistGate } from "redux-persist/integration/react";

import CreateEventPage from './pages/CreateEvent.jsx'
import LoginRegisterForm from './pages/login.jsx'
import Events from './pages/Event.jsx'
import ShowEvent from './pages/ShowEvent.jsx'
import Home from './pages/Home.jsx'
import Payment from './components/Payment.jsx'
import Logout from './components/Header/Logout.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* <Route path='/showevent' element={<EventPage/>}/> */}
      <Route path='/Home' element={<Home />} />
      <Route path='/signup' element={<LoginRegisterForm />} />
      <Route path='/createevent' element={<CreateEventPage />} />
      <Route path='/allevent' element={<Events />} />
      <Route path='/showEvent' element={<ShowEvent />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/event/:id" element={<ShowEvent/>} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* PersistGate delays rendering until the persisted state has been loaded */}
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,

)
