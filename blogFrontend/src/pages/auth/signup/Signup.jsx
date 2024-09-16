import React from 'react'
import "../auth.css"
import "../../../index.css"

import { Link } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import img from "../../../Assests/signup-girl.jpg"

function Signup() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    console.log(import.meta.env.VITE_BACKEND_API)
    console.log(formData);
    setErrors({});

    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_API}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.ok) {
          toast(response.message, {
            type: 'success',
            position: 'top-right',
            autoClose: 2000,
          });
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        } else {
          toast(response.message, {
            type: 'error',
            position: 'top-right',
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        toast(error.message, {
          type: 'error',
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };


  return (
    <div className='authout'>
      <div className='authin'>
        <div className="left">
          <img src={img} />
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
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}

              />
              {errors.name && <span className="formerror">{errors.name}</span>}
            </div>
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
            <div className="forminput_cont">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="formerror">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="main_button">Register</button>

            <p className='authlink'>Already have an account?
              <Link to="/signin"> Login</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup