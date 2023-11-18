import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Forgetpass() {
    const [email, setEmail] = useState();
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/sendotp', { email: email }).then((res) => {
            if (res.data.status === 'ok') {
                navigate('/enterotp', { state: { email: email } });
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
                                        <label className="label" htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            required
                                            name="email"
                                            id="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email address"
                                            pattern="[a-zA-Z0-9._%+-]+@.+\..+"
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

export default Forgetpass