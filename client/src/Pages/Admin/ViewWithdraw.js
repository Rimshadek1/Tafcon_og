import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ViewWithdraw() {
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [user, setUser] = useState([]);
    // const navigate = useNavigate()
    useEffect(() => {
        axios.get('/withdraw')
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); // The empty dependency array ensures this effect runs once on component mount

    const handleDelete = (id) => {
        axios.delete(`/delete-withdraw/${id}`)
            .then((res) => {
                // Check if the delete operation was successful
                if (res.data.status === 'ok') {
                    setDeleteSuccess(true); // Set the success state to true
                    // Fetch the updated events after successful deletion
                    axios.get('/withdraw')
                        .then((res) => {
                            setUser(res.data);
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
                            <Link to="/viewevents" className="btn btn-success ml-auto">
                                View event
                            </Link>
                        </div>
                        <div className="col">
                            <Link to="/verifyemp" className="btn btn-warning ml-auto">
                                Verify emp
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
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Number</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((event, index) => (
                                    <tr key={event._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{event.name}</td>
                                        <td>{event.number}</td>
                                        <td>{event.amount}</td>
                                        <td>{event.date}</td>

                                        <td>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(event._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

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

export default ViewWithdraw