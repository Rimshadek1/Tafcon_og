import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Addeventdate() {
    const [eventName, setEventname] = useState()
    const [date, setDate] = useState()
    const [reference, setReference] = useState()
    const [location, setLocation] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        const eventDetails = {
            event: eventName,
            date: date,
            ref: reference,
            location: location,
        };

        axios.post('/adddateevent', eventDetails)
            .then((res) => {
                if (res.data.status === 'ok') {
                    navigate('/dashboard');
                } else {
                    alert('No data added');
                }
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <div>
            <div className="row mt-5 mb-4 ms-4">

                <div className="col">
                    <Link to="/empinfo" className="btn btn-info ml-auto">
                        View Employees
                    </Link>
                </div>
                <div className="col">
                    <Link to="/verifyemp" className="btn btn-success ml-auto">
                        Verify Employees
                    </Link>
                </div>
                <div className="col">
                    <Link to="/viewwithdraw" className="btn btn-warning ml-auto">
                        View Withdraw
                    </Link>
                </div>
                <div className="col">
                    <Link to="/withdraw" className="btn btn-danger ml-auto">
                        Withdraw Salary
                    </Link>
                </div>
                <div className="col">
                    <Link to='/sitedetails' className=' btn btn-success ml-auto'>
                        Site details
                    </Link>
                </div>
            </div>
            < div className="container" >
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                        <form onSubmit={handleSubmit}>
                            <legend>Add Events dates and Details</legend>
                            <div className="form-group mt-4">
                                <label htmlFor="event">Event Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="eventname"
                                    id="eventname"
                                    placeholder="Event name"
                                    onChange={(e) => setEventname(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="Refference">Refference</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Refference"
                                    id="Refference"
                                    placeholder="Refer"
                                    onChange={(e) => setReference(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    id="location"
                                    placeholder="Location"
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="time">Event Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    id="date"
                                    placeholder="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addeventdate