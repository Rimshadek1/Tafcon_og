import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Notification() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState();
    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };
    const handleSubmit = () => {
        axios.post(`/notification`, { notification })
            .then((res) => {
                if (res.data.status === 'ok') {
                    navigate(-1);
                } else {
                    alert('Error: ' + res.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
                navigate('/login')
            });
    }
    return (
        <div>
            {/* header */}
            <div className="appHeader">
                <div className="left">
                    <a className="headerButton goBack" data-bs-toggle="modal" data-bs-target="#DialogBasic" onClick={handleGoBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 64 64" id="arrow">
                            <path fill="#FF396F" d="M37.9 46 24.1 32.3l13.8-13.7 2 2-11.8 11.7L39.9 44l-2 2"></path>
                        </svg>
                    </a>

                </div>
                <div className="pageTitle">
                    Notifications
                </div>
                <div className="right">
                    <Link to='/viewnotification' className='btn btn-primary'>View notifications</Link>
                </div>
            </div>
            {/* header */}
            < div className="container mt-5" >
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                        <form onSubmit={handleSubmit}>
                            <legend>ADD Notification</legend>
                            <div className="form-group mt-4">
                                <label htmlFor="Notification">Notifications</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Notification"
                                    id="Notification"
                                    placeholder="Notification"
                                    onChange={(e) => setNotification(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary mt-2">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Notification