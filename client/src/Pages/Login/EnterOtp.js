import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function EnterOtp() {
    const [otp, setOtp] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/enterotp', { otp: otp, email: location.state?.email || '' })
            .then((res) => {
                if (res.data.status === 'ok') {
                    navigate('/changepassword', { state: { email: location.state?.email || '' } });
                } else {
                    // Handle other responses or conditions if needed
                }
            })
            .catch((error) => {
                // Handle error response from the backend
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.message;

                    // Check for specific error messages and show alerts
                    if (errorMessage === 'Invalid OTP') {
                        alert('Invalid OTP. Please enter a valid OTP.');
                    } else if (errorMessage === 'Error checking OTP') {
                        alert('Error checking OTP. Please try again.');
                    } else if (errorMessage === 'Email not found') {
                        alert('Email not found. Please check your email address.');
                    } else if (errorMessage === 'Error finding email') {
                        alert('Error finding email. Please try again.');
                    } else {
                        // Handle other error messages as needed
                        alert(`Error: ${errorMessage}`);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received from backend:', error.request);
                    alert('No response received from the server');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up the request:', error.message);
                    alert('Error setting up the request');
                }
            });
    };


    return (
        <div>
            {/* App Header */}
            <div className="appHeader no-border transparent position-absolute">
                <div className="left">
                    <a href="#" className="headerButton goBack">
                        <ion-icon name="chevron-back-outline"></ion-icon>
                    </a>
                </div>
                <div className="pageTitle"></div>
                <div className="right">

                </div>
            </div>
            {/* * App Header */}

            {/* App Capsule */}
            <div id="appCapsule">
                <div className="section mt-2 text-center">
                    <h1>Forget Password ?</h1>
                    <h4>Generate otp</h4>
                </div>
                <div className="section mb-5 p-2">
                    <form onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-body pb-1">
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="otp">Enter OTP (Minimum 6 characters)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            name="otp"
                                            id="otp"
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Your OTP"
                                            minLength="6"
                                        />
                                    </div>
                                </div>



                            </div>
                        </div>

                        <div className="form-links mt-2">
                            <div>
                                <Link to="/signup" className='text-warning'>Register Now</Link>
                            </div>

                        </div>

                        <div className="form-button-group transparent">
                            <button
                                type="submit"
                                className="btn btn-warning btn-block btn-lg"
                            >
                                Generate OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div >
            {/* * App Capsule */}
        </div>
    )
}

export default EnterOtp