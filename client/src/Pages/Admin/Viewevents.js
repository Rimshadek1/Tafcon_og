import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Viewevents.css'
function Viewevents() {
    const [events, setEvents] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        // Make an HTTP GET request to your backend endpoint that retrieves events
        axios.get('/viewevent')
            .then((res) => {
                const sortedEvents = res.data.sort((a, b) => new Date(b.currentDateTime) - new Date(a.currentDateTime));
                setEvents(sortedEvents);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios.get('/viewevents').then(res => {
            console.log(res.data);
            if (res.data.status === 'please_reload') {

                navigate('/viewevents')
            } else {
                alert('status failed')
                navigate('/login')
            }
        }).catch(err => console.log(err))
    }, []);
    const handleLogout = async () => {
        try {
            await axios.post('/logout').then((res) => {
                alert(res.data.message)
                navigate('/login');
            })

        } catch (error) {
            console.error(error);
            navigate('/login');
        }
    };

    const handleDelete = (id) => {
        axios.delete(`/admin/delete-event/${id}`)
            .then((res) => {
                // Check if the delete operation was successful
                if (res.data.status === 'ok') {
                    setDeleteSuccess(true); // Set the success state to true
                    // Fetch the updated events after successful deletion
                    axios.get('/viewevent')
                        .then((res) => {
                            setEvents(res.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
            });
        setTimeout(() => {
            setDeleteSuccess(false);
        }, 5000);

    };




    return (
        <div>
            <section>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col">
                            <Link to="/addevents" className="btn btn-primary ml-auto">
                                Add Event
                            </Link>
                        </div>
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
                        <div className="col">
                            <Link to='/dashboard' className=' btn btn-primary ml-auto'>
                                dashboard
                            </Link>
                        </div>
                        <div className="col">
                            <Link to='/notification' className=' btn btn-primary ml-auto'>
                                Notification
                            </Link>
                        </div>
                    </div>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Location</th>
                                <th scope="col">Time</th>
                                <th scope="col">Date</th>
                                <th scope="col">Event_name</th>
                                <th scope="col">Slot_left</th>
                                <th scope="col">Slot_left_Captain</th>
                                <th scope="col">Slot_left_Mainboy</th>
                                <th scope="col">Slot_left_Supervisor</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={event._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{event.location}</td>
                                    <td>{event.time}</td>
                                    <td>{event.date}</td>
                                    <td>{event.event}</td>
                                    <td>
                                        {event.slot === 0 ? "Slot is full" : event.slot}
                                    </td>
                                    <td>{event.slotCap}</td>
                                    <td>{event.slotMain}</td>
                                    <td>{event.slotSuper}</td>
                                    <td>
                                        <Link to={`/editevents/${event._id}`} className="btn btn-primary">
                                            Edit
                                        </Link>
                                        &nbsp;&nbsp;

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(event._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {deleteSuccess && (
                        <div className="alert alert-danger delete-alert" role="alert">
                            Event deleted successfully!
                        </div>
                    )}
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </section >
        </div >
    );
}

export default Viewevents;
