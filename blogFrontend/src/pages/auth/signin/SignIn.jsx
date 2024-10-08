import React, { useState } from 'react';

import "../auth.css"
import "../../../index.css"

import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import img from "../../../Assests/signup-boy.jpg"


function SignIn() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        }
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        fetch(`${import.meta.env.VITE_BACKEND_API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.ok) {
                    toast(response.message, {
                        type: 'success',
                        position: 'top-right',
                        autoClose: 2000
                    });
                    checkLogin();
                } else {
                    toast(response.message, {
                        type: 'error',
                        position: 'top-right',
                        autoClose: 2000
                    });
                }
            })
            .catch((error) => {
                toast(error.message, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000
                });
            });
    };

    const checkLogin = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/checklogin`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
    
            if (response.ok) {
                const data = await response.json();
                // Assuming 'data.ok' is a field in your response
                if (data.ok) {
                    window.location.href = "/";
                } else {
                    // Handle case where login check fails
                    window.location.href = "/signin";  // Example redirect if not logged in
                }
            } else {
                throw new Error('Failed to fetch');
            }
        } catch (error) {
            console.error('Error checking login:', error);
            window.location.href = "/signin";  // Redirect to login on error
        }
    };
    
    
  return (
    <div className='authout'>
            
            <div className='authin'>
            <div className="left">
            <img src={img}  />
                </div>
                <div className='right'>
                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onSubmit={handleSubmit}
                    >
                        <div className="forminput_cont">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="formerror">{errors.email}</span>}
                        </div>
                        <div className="forminput_cont">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <span className="formerror">{errors.password}</span>
                            )}
                        </div>

                        <button type="submit" className="main_button">
                            Login
                        </button>

                        <p className="authlink">
                            Don't have an account? <Link to="/signup" >Register</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
  )
}

export default SignIn