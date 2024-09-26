import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Layout from './layouts/layout.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  
)
