import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function VerifyEmpl() {
    const [user, setUser] = useState([]);
    const [zoomed, setZoomed] = useState(null);
    const [zoomeded, setZoomeded] = useState(null);
    user.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));

    useEffect(() => {

        axios.get('/viewverifyuser').then((res) => {
            console.log(res.data);
            setUser(res.data)
        })
    }, [])
    // Function to handle image click
    const handleImageClick = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomed === userId) {
            setZoomed(null); // Zoom out
        } else {
            setZoomed(userId); // Zoom in
        }
    };
    // Function to handle image click
    const handleProofClick = (userId) => {
        // Toggle zoomed state for the clicked image
        if (zoomeded === userId) {
            setZoomeded(null); // Zoom out
        } else {
            setZoomeded(userId); // Zoom in
        }
    };
    const verifyUseer = (userId) => {
        axios.post(`/verify/${userId}`).then((res) => {
            if (res.data === 'success') {
                alert('successfully varified')
                window.location.reload();
            }
        })
    }
    const deleteUseer = (userId) => {
        axios.delete(`/deleteverifiy/${userId}`).then((res) => {
            if (res.data) {
                alert('successfully deleted')
                window.location.reload();
            }
        })
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }


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
                            <a href="/admin/add-salary" className="btn btn-success ml-auto">
                                Add Salary
                            </a>
                        </div>
                        <div className="col">
                            <a href="/admin/view-salary" className="btn btn-warning ml-auto">
                                View Salary
                            </a>
                        </div>
                        <div className="col">
                            <a href="/admin/withdraw" className="btn btn-danger ml-auto">
                                Withdraw Salary
                            </a>
                        </div>
                    </div>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Place</th>
                                <th scope="col">Address</th>
                                <th scope="col">Age</th>
                                <th scope="col">Height</th>
                                <th scope="col">Number</th>
                                <th scope="col">Xp in Event</th>
                                <th scope="col">Xp in Islamic</th>
                                <th scope="col">Current status</th>
                                <th scope="col">Role</th>
                                <th scope="col">Reg Date</th>
                                <th scope="col">Profile</th>
                                <th scope="col">Proof</th>
                            </tr>
                        </thead>
                        <tbody>

                            {user.map((users, index) => (
                                <tr key={users._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{users.name}</td>
                                    <td>{users.place}</td>
                                    <td>{users.adress}</td>
                                    <td>{users.age}</td>
                                    <td>{users.height}</td>
                                    <td>{users.number}</td>
                                    <td>{users.xp}</td>
                                    <td>{users.xpi}</td>
                                    <td>{users.currentStatus}</td>
                                    <td>{users.role}</td>
                                    <td>{formatDate(users.registrationDate)}</td>
                                    <td>
                                        <img
                                            className={`imaged w32 pointer-cursor ${zoomed === users._id ? 'zoom-image zoomed' : ''}`}
                                            src={`/Profile-pictures/${users._id}.png`} // PNG image URL
                                            onError={(e) => {
                                                e.target.onerror = null; // Prevent infinite loop
                                                e.target.src = `/Profile-pictures/${users._id}.jpg`; // Try JPG if PNG fails
                                            }}
                                            onClick={() => handleImageClick(users._id)} // Handle image click
                                            alt={`${users.name}'s Profile`}
                                        />
                                    </td>
                                    <td>
                                        <img
                                            className={`imaged w32 pointer-cursor ${zoomeded === users._id ? 'zoom-image zoomed' : ''}`}
                                            src={`/Proof/${users._id}.png`} // PNG image URL
                                            onError={(e) => {
                                                e.target.onerror = null; // Prevent infinite loop
                                                e.target.src = `/Proof/${users._id}.jpg`; // Try JPG if PNG fails
                                            }}
                                            onClick={() => handleProofClick(users._id)} // Handle image click
                                            alt={`${users.name}'s Proof`}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => deleteUseer(users._id)} className="btn btn-danger">
                                            Delete
                                        </button>
                                        &nbsp;&nbsp;
                                        <button onClick={() => verifyUseer(users._id)} className="btn btn-primary">
                                            Verify
                                        </button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>
            </section >
        </div >
    )
}

export default VerifyEmpl