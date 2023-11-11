import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';

function Login() {

    const [number, setNumber] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    const { setLoggedInUsername, setId } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('number', number);
        formData.append('password', password);

        axios.post('/login', formData)
            .then((res) => {
                if (res.data.status === 'success') {
                    if (res.data.role === 'admin') {
                        // Store the JWT token (customize this part based on your server response)
                        localStorage.setItem('jwtToken', res.data.token);

                        setLoggedInUsername(number);
                        setId(res.data.id);
                        navigate('/viewevents');
                    } else {
                        // Store the JWT token (customize this part based on your server response)
                        localStorage.setItem('jwtToken', res.data.token);

                        setLoggedInUsername(number);
                        setId(res.data.id);
                        navigate('/');
                    }
                } else {
                    alert('Login error: ' + res.data.message);
                }
            }).catch((error) => {
                alert('An error occurred during login.');
                console.error(error);
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
                    <h1>Log in</h1>
                    <h4>Fill the form to log in</h4>
                </div>
                <div className="section mb-5 p-2">
                    <form onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-body pb-1">
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="mobile">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="mobile"
                                            id="mobile"
                                            placeholder="Your Mobile Number"
                                            pattern="[0-9]{10}"
                                            required
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                        <i className="clear-input">
                                            <ion-icon name="close-circle"></ion-icon>
                                        </i>
                                    </div>
                                </div>

                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="password1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password1"
                                            name="password1"
                                            autoComplete="off"
                                            placeholder="Your password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <i className="clear-input">
                                            <ion-icon name="close-circle"></ion-icon>
                                        </i>
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
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* * App Capsule */}
        </div>
    )
}

export default Login