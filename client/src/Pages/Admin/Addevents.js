import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Addevents() {
    const [location, setLocation] = useState()
    const [time, setTime] = useState()
    const [date, setDate] = useState()
    const [event, setEvent] = useState()
    const [type, setType] = useState()
    const [slot, setSlot] = useState()
    const [slotCap, setSlotCap] = useState()
    const [slotMain, setSlotMain] = useState()
    const [slotSuper, setSlotSuper] = useState()
    const [ref, setRef] = useState()
    const [timeevent, setTimeevent] = useState()
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('location', location);
        formData.append('time', time);
        formData.append('date', date);
        formData.append('event', event);
        formData.append('type', type);
        formData.append('slot', slot);
        formData.append('slotCap', slotCap);
        formData.append('slotMain', slotMain);
        formData.append('slotSuper', slotSuper);
        formData.append('ref', ref);
        formData.append('timeevent', timeevent);

        axios.post('/addevent', formData)
            .then((res) => {
                // Check the response for success
                if (res.data.status === 'ok') {
                    // Redirect to the home page or perform any other action on success
                    navigate('/viewevents');
                } else {
                    // Handle any specific error messages from the server and show an alert
                    alert('Failed to add event. Please check your data and try again.');
                    navigate(-1)
                }
            })
            .catch((error) => {
                // Handle network errors or unexpected errors
                console.error(error);

            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                    <form onSubmit={handleSubmit}>
                        <legend>Add Event</legend>

                        <div className="form-group mt-4">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="location"
                                id="location"
                                placeholder="Location of work"
                                required
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="time">Time</label>
                            <input
                                type="text"
                                className="form-control"
                                name="time"
                                id="time"
                                required
                                placeholder="Time of work"
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date"
                                id="date"
                                required
                                placeholder="Date of work"
                                onChange={(e) => setDate(e.target.value)}

                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="event">Event Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="event"
                                placeholder="Event name"
                                id="event"
                                required
                                onChange={(e) => setEvent(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="event">Reffered By</label>
                            <input
                                type="text"
                                className="form-control"
                                name="ref"
                                placeholder="Refer"
                                id="ref"
                                required
                                onChange={(e) => setRef(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="event">Event Type</label>
                            <select
                                className="form-control"
                                name="type"
                                id="type"
                                required
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="select">select</option>
                                <option value="Normal">Normal</option>
                                <option value="Islamic">Islamic</option>
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Timeevent">Event Time</label>
                            <select
                                className="form-control"
                                name="Timeevent"
                                id="Timeevent"
                                required
                                onChange={(e) => setTimeevent(e.target.value)}
                            >
                                <option value="select">select</option>
                                <option value="Morning">Morning</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Night">Night</option>
                            </select>
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="slotCap">Slot for captain</label>
                            <input
                                type="number"
                                className="form-control"
                                name="slotCap"
                                placeholder="Slot for Captain"
                                id="slotCap"
                                required
                                onChange={(e) => setSlotCap(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="slotmain">Slot for Main Boy</label>
                            <input
                                type="number"
                                className="form-control"
                                name="slotmain"
                                placeholder="Slot for main boy"
                                id="slotmain"
                                required
                                onChange={(e) => setSlotMain(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="slotmain">Slot for Supervisor</label>
                            <input
                                type="number"
                                className="form-control"
                                name="Supervisor"
                                placeholder="Slot for Supervisor"
                                id="Supervisor"
                                required
                                onChange={(e) => setSlotSuper(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="slot">Slot Left for boys</label>
                            <input
                                type="number"
                                className="form-control"
                                name="slot"
                                placeholder="Slot left for boys"
                                id="slot"
                                required
                                onChange={(e) => setSlot(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-2">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addevents