import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom'

function Viewnotification() {

    const [notifications, setNotifications] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useEffect(() => {
        axios.get('/notification')
            .then((res) => {
                if (res.data && res.data.notification) {
                    console.log(res.data.notification);
                    setNotifications(res.data.notification);

                } else {
                    alert('Error');
                }
            })
            .catch((error) => {
                console.error(error);

            });
    }, []);
    const handleDelete = (id) => {
        axios.delete(`/notification/${id}`)
            .then((res) => {
                // Check if the delete operation was successful
                if (res.data.status === 'ok') {
                    setDeleteSuccess(true); // Set the success state to true
                    axios.get('/notification')
                        .then((res) => {
                            if (res.data && res.data.notification) {
                                console.log(res.data.notification);
                                setNotifications(res.data.notification);

                            } else {
                                alert('Error');
                            }
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
                                <th scope="col">Notification</th>

                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((event, index) => (
                                <tr key={event._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{event.notification.notification}</td>

                                    <td>

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
                </div>
            </section >
        </div >
    )
}

export default Viewnotification