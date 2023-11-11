import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function Te() {
    const { user_id } = useParams();
    const eventId = new URLSearchParams(window.location.search).get('eventId'); // Access eventId from query parameter

    const navigate = useNavigate();
    const [teFor, setTeFor] = useState();
    const [te, setTe] = useState();
    const handleSubmit = () => {
        axios.post(`/te/${user_id}?eventId=${eventId}`, { teFor, te })
            .then((res) => {
                if (res.data.status === 'ok') {
                    navigate(-1); // Go back to the previous page
                } else {
                    alert('Error: ' + res.data.message); // Alert the error message
                }
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }
    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };
    // goback
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
                    Confirm Booking
                </div>
                <div className="right">
                    <a href="/bookings" className="headerButton" data-bs-toggle="modal" data-bs-target="#DialogBasic">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="bag" fill="none">
                            <g fill="none" fill-rule="evenodd" stroke="#FF396F" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(2.5 1.5)">
                                <path fill="none" d="M14.01373 20.0000001L5.66590392 20.0000001C2.59954235 20.0000001.247139589 18.8924486.915331812 14.4347827L1.69336385 8.39359272C2.10526317 6.16933642 3.52402748 5.31807783 4.76887874 5.31807783L14.9473685 5.31807783C16.2105264 5.31807783 17.5469108 6.23340964 18.0228834 8.39359272L18.8009154 14.4347827C19.3684211 18.3890161 17.0800916 20.0000001 14.01373 20.0000001zM14.1510298 5.09839819C14.1510298 2.71232585 12.216736 .7779932 9.83066366 .7779932L9.83066366.7779932C8.68166274.773163349 7.57805185 1.22619323 6.76386233 2.03694736 5.9496728 2.84770148 5.49199087 3.94938696 5.49199087 5.09839819L5.49199087 5.09839819"></path>
                                <line x1="12.796" x2="12.751" y1="9.602" y2="9.602"></line>
                                <line x1="6.966" x2="6.92" y1="9.602" y2="9.602"></line>
                            </g>
                        </svg>
                    </a>



                </div>
            </div>
            {/* header */}
            < div className="container" >
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                        <form onSubmit={handleSubmit}>
                            <legend>Travel Expense</legend>
                            <div className="form-group mt-4">
                                <label htmlFor="teFor">Route</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="teFor"
                                    id="teFor"
                                    placeholder="Te For"
                                    onChange={(e) => setTeFor(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="te">OT amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="te"
                                    id="te"
                                    placeholder="Te"
                                    onChange={(e) => setTe(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-2">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* footer */}
            <div className="appBottomMenu">
                <Link to="/" className="item">
                    <div className="col">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="pie-chart" width="25" height="25">
                            <path d="M25,17H15V7a1,1,0,0,0-1-1A12,12,0,1,0,26,18,1,1,0,0,0,25,17ZM14,28A10,10,0,0,1,13,8.05V18a1,1,0,0,0,1,1H24A10,10,0,0,1,14,28ZM18,2a1,1,0,0,0-1,1V14a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1A12,12,0,0,0,18,2Zm1,11V4.05a10,10,0,0,1,9,9Z"
                                data-name="96  Pie Chart, Chart, Diagram, Pie"></path>
                        </svg>

                        <strong>Overview</strong>
                    </div>
                </Link>
                <Link to="/transactions" className="item">
                    <div className="col">
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 16 16" id="text-file" width="25" height="25"><polygon fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" points="13 14 3 14 3 2 9.98 2 11.51 3.35 13 4.79 13 14"></polygon><polyline fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round" points="9.78 2.54 9.78 5.54 12.78 5.54"></polyline><line x1="5" x2="8" y1="8" y2="8" fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round"></line><line x1="5" x2="9" y1="10" y2="10" fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round"></line>
                            <line x1="5" x2="10" y1="12" y2="12" fill="none" stroke="#231f20" stroke-linecap="round" stroke-linejoin="round"></line></svg>
                        <strong>Transaction</strong>
                    </div>
                </Link>
                <Link to="/bookings" className="item">
                    <div className="col">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="slack" width="25" height="25" stroke="#FF396F">
                            <path d="M17.5 14a3.5 3.5 0 0 0 3.5-3.5v-5a3.5 3.5 0 0 0-7 0v5a3.5 3.5 0 0 0 3.5 3.5zM16 5.5a1.5 1.5 0 0 1 3 0v5a1.5 1.5 0 0 1-3 0zM8.5 9H11a1 1 0 0 0 1-1V5.5A3.5 3.5 0 1 0 8.5 9zm0-5A1.5 1.5 0 0 1 10 5.5V7H8.5a1.5 1.5 0 0 1 0-3zM24 12h2.5A3.5 3.5 0 1 0 23 8.5V11a1 1 0 0 0 1 1zm1-3.5a1.5 1.5 0 1 1 1.5 1.5H25zM23.5 22H21a1 1 0 0 0-1 1v2.5a3.5 3.5 0 1 0 3.5-3.5zm0 5a1.5 1.5 0 0 1-1.5-1.5V24h1.5a1.5 1.5 0 0 1 0 3zM8 20H5.5A3.5 3.5 0 1 0 9 23.5V21a1 1 0 0 0-1-1zm-1 3.5A1.5 1.5 0 1 1 5.5 22H7zm7-9a3.5 3.5 0 0 0-3.5-3.5h-5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 0 3.5-3.5zM10.5 16h-5a1.5 1.5 0 0 1 0-3h5a1.5 1.5 0 0 1 0 3zm4 2a3.5 3.5 0 0 0-3.5 3.5v5a3.5 3.5 0 0 0 7 0v-5a3.5 3.5 0 0 0-3.5-3.5zm1.5 8.5a1.5 1.5 0 0 1-3 0v-5a1.5 1.5 0 0 1 3 0zM26.5 14h-5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 0 0-7zm0 5h-5a1.5 1.5 0 0 1 0-3h5a1.5 1.5 0 0 1 0 3z" data-name="Layer 20"></path></svg>
                        <strong>My Bookings</strong>
                    </div>
                </Link>
                <Link to="/events" className="item">
                    <div className="col">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48" viewBox="0 0 48 48" id="card-payment" width="25" height="25"><path d="M44,11H4c-0.55,0-1,0.45-1,1v6v18c0,0.55,0.45,1,1,1h40c0.55,0,1-0.45,1-1V18v-6C45,11.45,44.55,11,44,11z M43,35H5V19h38
		V35z M43,17H5v-4h38V17z"></path><path d="M9,33h6c0.55,0,1-0.45,1-1v-6c0-0.55-0.45-1-1-1H9c-0.55,0-1,0.45-1,1v6C8,32.55,8.45,33,9,33z M10,27h4v4h-4V27z"></path></svg>
                        <strong>Event</strong>
                    </div>
                </Link>
                <Link to="/settings" className="item">
                    <div className="col">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" id="settings" width="25" height="25"><path d="m19.7 3.6.4 2.8.2 1.6 1.5.6c.8.3 1.6.8 2.3 1.3l1.3 1 1.6-.6 2.6-1.1 1.7 2.9-2.2 1.9-1.3 1 .2 1.7c.1.9.1 1.8 0 2.6l-.2 1.7 1.3 1 2.2 1.8-1.7 2.9-2.6-1.1-1.5-.6-1.3 1c-.7.5-1.5 1-2.3 1.3l-1.6.7-.2 1.6-.4 2.8h-3.4l-.4-2.8-.2-1.6-1.5-.6c-.8-.3-1.6-.8-2.2-1.4l-1.3-1-1.7.6-2.6 1.1-1.7-2.9L6.9 22l1.3-1-.2-1.7c-.1-.4-.1-.9-.1-1.3s0-.9.1-1.3l.2-1.7-1.3-1-2.2-1.8 1.7-2.9L9 10.4l1.5.6 1.3-1c.7-.5 1.5-1 2.3-1.3l1.6-.7.2-1.6.4-2.8h3.4M21.5.7h-7c-.4 0-.8.3-.8.7L13 6c-1 .4-2 1-2.9 1.7L5.8 6c-.1 0-.2-.1-.3-.1-.3 0-.6.2-.7.4l-3.5 6c-.2.4-.1.8.2 1.1l3.7 2.8C5 16.9 5 17.4 5 18c0 .6 0 1.1.1 1.7l-3.6 2.9c-.3.3-.4.7-.2 1.1l3.5 6c.2.3.4.4.8.4.1 0 .2 0 .3-.1l4.3-1.7C11 29 12 29.6 13 30l.6 4.6c.1.4.4.7.8.7h7c.4 0 .8-.3.8-.7L23 30c1-.4 2-1 2.9-1.7l4.3 1.7c.1 0 .2.1.3.1.3 0 .6-.2.7-.4l3.5-6c.2-.4.1-.8-.2-1.1l-3.6-2.8c.1-1.1.1-2.3 0-3.4l3.6-2.9c.3-.3.4-.7.2-1.1l-3.5-6c-.2-.3-.4-.4-.8-.4-.1 0-.2 0-.3.1l-4.3 1.7C25 7 24 6.4 23 6l-.7-4.6c0-.4-.4-.7-.8-.7z">
                        </path><path d="M18 24.1c-3.4 0-6.1-2.7-6.1-6.1s2.7-6.1 6.1-6.1 6.1 2.7 6.1 6.1c0 3.3-2.8 6.1-6.1 6.1z"></path></svg>
                        <strong>Settings</strong>
                    </div>
                </Link>
            </div >
            {/* footer */}
        </div>
    )
}

export default Te