import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../components/navbar/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
    return (
        <>
            
            <Navbar />
            <ToastContainer /> 
            <Outlet />

        </>
    )
}

export default Layout