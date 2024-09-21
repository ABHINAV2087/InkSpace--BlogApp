import React, { useState , useEffect} from 'react';
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {deleteCookie } from 'cookies-next';
import logo from "../../Assests/logo.png";
import { toast } from 'react-toastify';
function Navbar() {
    const [auth, setAuth] = useState(false);

    const checkLogin = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_API}/auth/checklogin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            if (response.ok) {
                // toast(response.message, {
                //     type: 'success',
                //     position: 'top-right',
                //     autoClose: 2000
                // })

                // window.location.href = "/auth/signin"
                setAuth(true)

            } else {
                // toast(response.message, {
                //     type: 'error',
                //     position: 'top-right',
                //     autoClose: 2000
                // });
                setAuth(false)
            }
        }).catch(( error) => {
            toast(error.message, {
                type: 'error',
                position: 'top-right',
                autoClose: 2000
            });
        })
    }

    useEffect(() => {
        checkLogin(); // Call the checkLogin function on route change
    }, []);

    const handleLogout = async () => {
        console.log("Attempting to log out...");
        try {
            // First, make a request to the backend to log out and clear the session
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/logout`, {
                method: 'GET',
                credentials: 'include', // This ensures cookies are sent with the request
            });
    
            const data = await response.json();
            
            if (response.ok) {
                console.log("Logout successful on server");
    
                // If logout is successful, delete cookies client-side
                await deleteCookie('authToken', { path: '/' });
                await deleteCookie('refreshToken', { path: '/' });
    
                console.log("Cookies deleted");
                setAuth(false);  // Reset auth state
                window.location.href = "/signin"; // Redirect to signin page
            } else {
                console.error("Logout failed on server:", data.message);
                toast(data.message, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000
                });
            }
        } catch (error) {
            console.error("Logout error:", error);
        
            // Check if error.message exists, otherwise provide a default message
            const errorMessage = error?.message || 'An unexpected error occurred during logout.';
        
            // Show the error message in the toast notification
            toast(errorMessage, {
                type: 'error',
                position: 'top-right',
                autoClose: 2000
            });
        }
        
    };
    
    
    
    

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <Link to="/profile" className='nav-link'>
                    <FaUser className='icon' />
                </Link>

                <Link to="/addblog" className='nav-link'>
                    <IoMdAdd className='icon' />
                    <span>Add Blog</span>
                </Link>

                <Link to="/search" className='nav-link'>
                    <FaSearch className='icon' />
                    <span>Search</span>
                </Link>
            </div>

            {
                auth ? (
                    <div className='navbar-right'>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                            Home
                        </NavLink>
                        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                            About
                        </NavLink>
                        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                            Contact
                        </NavLink>
                        <button onClick={handleLogout} style={{marginLeft:"20px"}}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='navbar-right'>
                        <Link to="/signin">
                            <button>
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button>
                                Signup
                            </button>
                        </Link>
                    </div>
                )
            }

            <div className='navbar-middle'>
                <Link to="/" className='logo'>
                    <img src={logo} className="logo-img" alt="InkSpace" style={{ height: "50px", width: "100px" }} />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
