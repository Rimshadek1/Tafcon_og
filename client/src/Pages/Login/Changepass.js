import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Changepass() {
    const location = useLocation();
    const email = location.state?.email || '';
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/changepass", { email, password })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === 'ok') {
                    alert('Password changed successfully');
                    navigate('/login');
                } else {
                    alert(`Error: ${res.data.message}`);
                }
            })
            .catch((error) => {
                console.error('Error in frontend:', error);
                alert('An error occurred. Please try again.');
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
                                        <label className="label" htmlFor="password1">Password (must contain at least one alphabet, one number, one special character, and be a minimum of 6 characters).</label>
                                        <input
                                            type="password"
                                            required
                                            className="form-control"
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="password1"
                                            autoComplete="off"
                                            placeholder="Your Password"
                                            name="password1"
                                            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$"
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
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div >
            {/* * App Capsule */}
        </div>
    )
}

export default Changepass