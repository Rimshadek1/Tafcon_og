import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState()
    const [place, setPlace] = useState()
    const [address, setAddress] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const [height, setHeight] = useState()
    const [xp, setXp] = useState()
    const [xpi, setXpi] = useState()
    const [currentStatus, setCurrentStatus] = useState()
    const [number, setNumber] = useState()
    const [password, setPassword] = useState()
    const [image, setImage] = useState(null)
    const [proof, setProof] = useState(null)
    const [registrationDate] = useState(new Date());
    const navigate = useNavigate()
    //image manage
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    //image manage
    const handleProofChange = (e) => {
        const file = e.target.files[0];
        setProof(file);
    };
    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('name', name);
        formData.append('place', place);
        formData.append('email', email);
        formData.append('adress', address);
        formData.append('age', age);
        formData.append('height', height);
        formData.append('number', number);
        formData.append('xp', xp);
        formData.append('xpi', xpi);
        formData.append('currentStatus', currentStatus);
        formData.append('password', password);
        formData.append('image', image);
        formData.append('proof', proof);
        formData.append('role', 'Unknown');
        formData.append('registrationDate', registrationDate);

        axios.post('/register', formData)
            .then((response) => {
                if (response.data.status === 'success') {
                    navigate('/verifing');
                } else if (response.data.error.includes('Mobile number is already registered')) {
                    alert(response.data.error);
                } else {
                    alert('An error occurred during registration: ' + response.data.error);
                }
            })
            .catch((error) => {
                alert('An error occurred during registration.');
                console.error(error);
            });
    };


    return (
        <div>
            <div class="appHeader no-border transparent position-absolute">

                <div class="pageTitle"></div>
                <div class="right">
                    <Link to="/login" class="headerButton text-warning">
                        Login
                    </Link>
                </div>
            </div>

            {/* body */}
            <div id="appCapsule">
                <div className="section mt-2 text-center">
                    <h1>Register now</h1>
                    <h4>Create an account</h4>
                </div>
                <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
                    <div className="section mb-5 p-2">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                            id="name"
                                            placeholder="Your Name" />

                                    </div>
                                </div>
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="place">Place</label>
                                        <input type="text"
                                            className="form-control"
                                            required
                                            name="place" id="place"
                                            onChange={(e) => setPlace(e.target.value)}
                                            placeholder="Your Place" />
                                    </div>
                                </div>
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="address">Address</label>
                                        <input type="text"
                                            className="form-control"
                                            required
                                            name="address" id="address"
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Your address" />
                                    </div>
                                </div>
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

                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="age">Age (In between 18-35 years old)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            required
                                            name="age"
                                            id="age"
                                            onChange={(e) => setAge(e.target.value)}
                                            placeholder="Your Age"
                                            min="16"
                                            max="35"
                                        />
                                    </div>
                                </div>
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="height">Height (In between 140-190 cm)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            required
                                            name="height"
                                            id="height"
                                            onChange={(e) => setHeight(e.target.value)}
                                            placeholder="Your height"
                                            min="140"
                                            max="190"
                                        />

                                    </div>
                                </div>
                                <div className="form-group basic">

                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="height">Experiance in Catering (In months)</label>
                                        <input type="number"
                                            className="form-control"
                                            required
                                            name="xp" id="xp"
                                            onChange={(e) => setXp(e.target.value)}
                                            placeholder="Your Experiance in Catering" />
                                    </div>
                                </div>
                                <div className="form-group basic">

                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="height">Experiance in Islamic Buffet  (In months)</label>
                                        <input type="number"
                                            className="form-control"
                                            required
                                            name="xpi" id="xpi"
                                            onChange={(e) => setXpi(e.target.value)}
                                            placeholder="Your Experiance in Islamic Buffet" />
                                    </div>
                                </div>

                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="status">Currentstatus</label>
                                        <select
                                            type="text"
                                            className="form-control"
                                            required
                                            name="status" id="status"
                                            onChange={(e) => setCurrentStatus(e.target.value)}
                                            placeholder="status"
                                        >
                                            <option >Select</option>
                                            <option value="Studing">Studing</option>
                                            <option value="Working">Working</option>
                                            <option value="Free">Free</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="mobile">Mobile Number</label>
                                        <div className="input-group">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="mobile"
                                                id="mobile"
                                                onChange={(e) => setNumber(e.target.value)}
                                                placeholder="Your Mobile Number"
                                                pattern="[0-9]{10}"
                                                required
                                            />

                                        </div>

                                    </div>
                                </div>
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="password1">Password (must contain at least one alphabet, one number, one special character, and be a minimum of 6 characters).<br /> Please remember, there is no way to change or update your password.</label>
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


                                <img alt='Add your profile please' width='200px' height='200px' src={image ? URL.createObjectURL(image) : ''}></img>
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="image">Full size Photo</label>
                                        <input
                                            type="file"
                                            required
                                            className="form-control"
                                            id="image"
                                            autoComplete="off"
                                            placeholder="Your Profile Picture"
                                            name="image"
                                            onChange={handleImageChange}
                                            accept=".jpg, .png"
                                        />

                                    </div>
                                </div>
                                <img alt='Add your Proof please' width='200px' height='200px' src={proof ? URL.createObjectURL(proof) : ''}></img>
                                <div className="form-group basic">
                                    <div className="input-wrapper">
                                        <label className="label" htmlFor="proof">Adhaar/Driving lisence (both-sides)</label>
                                        <input
                                            type="file"
                                            required
                                            className="form-control"
                                            id="proof"
                                            autoComplete="off"
                                            placeholder="Your Proof Picture"
                                            name="proof"
                                            onChange={handleProofChange}
                                            accept=".jpg, .png"
                                        />
                                    </div>
                                </div>
                                <div className="custom-control custom-checkbox mt-2 mb-1">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="customCheckb1"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-button-group transparent">
                            <button
                                type="submit"
                                className="btn btn-warning btn-block btn-lg"
                            >
                                Register
                            </button>

                        </div >
                    </div >
                </form >
            </div >
            {/* body */}
        </div >
    )
}

export default Signup