import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Layout() {
  return (
    <>
        <Header/>
        <ToastContainer/>
        <Outlet/>
        
        <Footer/>
    </>
  )
}

export default Layout