import React, { useState , useEffect} from 'react';
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {deleteCookie } from 'cookies-next';

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
        }).catch(( err) => {
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

    const handlelogout = async () => {
        await deleteCookie('authToken');
        await deleteCookie('refreshToken');
        window.location.href = "/signin"
    }

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
                        <button onClick={handlelogout} style={{marginLeft:"20px"}}>
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
                    <img src="/src/Assests/logo.png" className="logo-img" alt="InkSpace" style={{ height: "50px", width: "100px" }} />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
