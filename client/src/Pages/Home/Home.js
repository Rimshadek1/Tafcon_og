import React, { useEffect, useState, useRef } from 'react';
import './assets/css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css'
function Home() {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [events, setEvents] = useState([]);
    const [fine, setFine] = useState(0)
    const [withdraw, setWithraw] = useState(0)
    const [income, setIncome] = useState(0)
    const [balance, setBalance] = useState(0)
    const [notifications, setNotifications] = useState([]);
    //all amounts
    useEffect(() => {
        axios.get('/amount').then(res => {
            if (res.data) {
                setFine(res.data.fine.totalFine)
                setWithraw(res.data.withdraw.totalWithdraw)
                setIncome(res.data.income.total)
                setBalance(res.data.balance)
            }


        }).catch(err => console.log(err))
    }, []);

    //transactions

    const [details, setDetails] = useState([]);
    const [detailsFine, setDetailsFine] = useState([]);
    const [detailsOt, setDetailsOt] = useState([]);
    const [detailsTe, setDetailsTe] = useState([]);
    const [detailsWithdraw, setDetailsWithdraw] = useState([]);
    const [mergedDetails, setMergedDetails] = useState([]);
    useEffect(() => {
        // Fetch salary details
        axios.get('/viewSalary')
            .then((res) => {
                if (res.data.status === 'success') {
                    setDetails(res.data.details);
                }
            })
            .catch((error) => {
                console.error('Error fetching salary data:', error);
                // alert('Failed to fetch data from the server');
            });

        // Fetch fine details
        axios.get('/viewFine')
            .then((res) => {
                if (res.data.status === 'success') {
                    setDetailsFine(res.data.details);
                }
            })
            .catch((error) => {
                console.error('Error fetching fine data:', error);
            });

        // Fetch overtime details
        axios.get('/ot')
            .then((res) => {
                if (res.data.status === 'success') {
                    setDetailsOt(res.data.details);
                }
            })
            .catch((error) => {
                console.error('Error fetching OT data:', error);
            });
        // Fetch withdraw details
        axios.get('/withdrawf')
            .then((res) => {
                if (res.data.status === 'success') {
                    setDetailsWithdraw(res.data.details);
                }
            })
            .catch((error) => {
                console.error('Error fetching withdraw data:', error);
            });
        // fetch Te details
        axios.get('/te')
            .then((res) => {
                if (res.data.status === 'success') {
                    setDetailsTe(res.data.details);
                }
            })
            .catch((error) => {
                console.error('Error fetching withdraw data:', error);
            });
    }, []);



    // Merge salary, fine, OT, and withdraw details
    useEffect(() => {
        const merged = [...details, ...detailsFine, ...detailsOt, ...detailsWithdraw, ...detailsTe];
        // Sort the merged array by date in descending order
        const sortedDetails = merged.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMergedDetails(sortedDetails);
    }, [details, detailsFine, detailsOt, detailsWithdraw, detailsTe]);


    // slider

    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [role, setRole] = useState()
    const [showButton, setShowButton] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the speed of dragging as needed
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    // Bootstrap color classes
    const bootstrapColors = ['bg-danger', 'bg-black', 'bg-danger', 'bg-black'];



    // getting events
    useEffect(() => {
        axios.get('/getevents').then(res => {
            const sortedEvents = res.data.sort((a, b) => new Date(b.currentDateTime) - new Date(a.currentDateTime));

            setEvents(sortedEvents)

        }).catch(err => console.log(err))
    }, []);

    //security
    useEffect(() => {
        let isMounted = true;

        axios.get('/home')
            .then(res => {
                if (isMounted && res.data.role) {
                    setRole(res.data.role);
                    navigate('/');
                }
            })
            .catch(err => console.log(err));

        return () => {
            isMounted = false;
        };
    }, []);



    //profilepicture
    useEffect(() => {
        // Make an HTTP GET request to fetch the image URL
        axios.get('/profile-image')
            .then((res) => {
                // Check if imageUrl is not empty before setting it
                if (res.data.imageUrl) {
                    setImageUrl(res.data.imageUrl);
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    //works bookings
    function handleAddButtonClick(eventId) {
        const confirmed = window.confirm('Do you want to add this event to your list?');

        if (confirmed) {
            axios.post(`/confirmbooking/${eventId}`)
                .then((res) => {
                    if (res.data.status === 'success') {
                        alert('Booking confirmed');
                        navigate('/bookings');
                    } else if (res.data.status === 'already booked') {
                        alert('This event is already booked.');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Handle the case where the user clicked cancel
            console.log('Add action canceled.');
        }
    }
    function handleAddButtonClickMain(eventId) {
        const confirmed = window.confirm('Do you want to add this event to your list?');

        if (confirmed) {
            axios.post(`/confirmbookingMain/${eventId}`)
                .then((res) => {
                    if (res.data.status === 'success') {
                        alert('Booking confirmed');
                        navigate('/bookings');
                    } else if (res.data.status === 'already booked') {
                        alert('This event is already booked.');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Handle the case where the user clicked cancel
            console.log('Add action canceled.');
        }
    }
    function handleAddButtonClickSuper(eventId) {
        const confirmed = window.confirm('Do you want to add this event to your list?');

        if (confirmed) {
            axios.post(`/confirmbookingSuper/${eventId}`)
                .then((res) => {
                    if (res.data.status === 'success') {
                        alert('Booking confirmed');
                        navigate('/bookings');
                    } else if (res.data.status === 'already booked') {
                        alert('This event is already booked.');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Handle the case where the user clicked cancel
            console.log('Add action canceled.');
        }
    }
    //notifications
    useEffect(() => {
        axios.get('/notification')
            .then((res) => {
                if (res.data && res.data.notification) {
                    setNotifications(res.data.notification);
                } else {
                    alert('Error');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    //site details
    useEffect(() => {
        if (role === 'captain' || 'admin') {
            setShowButton(true);
        }
    }, [role]);
    function handleClick() {
        alert('app is under proccessing, please wait until the work is over!!')
    }

    //  Is booked checking
    const [isEvent, setIsEvent] = useState([]);

    useEffect(() => {
        axios.get('/isBooked').then(res => {
            const bookedEvents = res.data.bookedEvents; // Assuming the response structure
            setIsEvent(bookedEvents);
        }).catch(err => console.log(err));
    }, []);
    return (
        <div>


            {/* Header */}
            < div className="appHeader bg-warning text-light ">
                <div className="left">

                </div>
                <div className="pageTitle">
                    <img src="logo/tafcon.png" alt="logo" className="logo" />
                </div>
                <div className="right">
                    <Link to="/bookings" className="headerButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="bag" fill="none">
                            <g fill="none" fill-rule="evenodd" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(2.5 1.5)">
                                <path fill="none" d="M14.01373 20.0000001L5.66590392 20.0000001C2.59954235 20.0000001.247139589 18.8924486.915331812 14.4347827L1.69336385 8.39359272C2.10526317 
                                6.16933642 3.52402748 5.31807783 4.76887874 5.31807783L14.9473685 5.31807783C16.2105264 5.31807783 17.5469108 6.23340964 18.0228834 8.39359272L18.8009154 14.4347827C19.3684211 18.3890161 17.0800916 20.0000001 14.01373 20.0000001zM14.1510298 5.09839819C14.1510298 2.71232585 12.216736 .7779932 9.83066366 .7779932L9.83066366.7779932C8.68166274.773163349 7.57805185 1.22619323 6.76386233 2.03694736 5.9496728 2.84770148 5.49199087 3.94938696 5.49199087 5.09839819L5.49199087 5.09839819"></path>
                                <line x1="12.796" x2="12.751" y1="9.602" y2="9.602"></line>
                                <line x1="6.966" x2="6.92" y1="9.602" y2="9.602"></line>
                            </g>
                        </svg>

                        <span className="badge badge-success"></span>
                    </Link>
                    <Link to='/roledetails' className='imaged w32 mt-1 exclamation'>
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 32 32" fill='white'><path
                            d="M12,14a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,14Zm0-1.5a1,1,0,0,0,1-1v-3a1,1,0,0,0-2,0v3A1,1,0,0,0,12,
12.5ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"></path></svg>
                    </Link>

                    <Link to="/settings" className="headerButton">
                        <img src={'/Profile-pictures/' + imageUrl} class="imaged w32" alt='profile' ></img>
                    </Link>
                </div>
            </div >

            {/* Header */}
            {/* body */}

            <div id="appCapsule">
                <div className="section wallet-card-section pt-1">
                    <div className="wallet-card">
                        <div className="balance">
                            <div className="left">
                                <span className="title">Total Balance is </span>
                                <h1 className="total">{balance}</h1>
                            </div>
                        </div>

                        <div className="wallet-footer">
                            <div className="item text-light" onClick={handleClick}>
                                <a href="/" data-bs-toggle="modal" data-bs-target="#withdrawActionSheet">
                                    <div className="icon-wrapper bg-danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="arrow-down" width="24" height="24" style={{ fill: '#FFFFFF', width: '24px', height: '24px' }}>
                                            <rect width="200" height="200" fill="none"></rect>
                                            <line x1="128" x2="128" y1="40" y2="216" fill="none" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                                            <polyline fill="none" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" points="56 144 128 216 200 144"></polyline>
                                        </svg>
                                    </div>
                                    <strong>Withdraw</strong>
                                </a>
                            </div>

                            <div className="item" onClick={handleClick}>
                                <a href="/">
                                    {/* data-bs-toggle="modal" data-bs-target="#depositActionSheet" */}
                                    <div className="icon-wrapper">
                                        <ion-icon name="cash-outline"></ion-icon>
                                    </div>
                                    <strong>G-Pay</strong>
                                </a>
                            </div>
                            <div className="item" onClick={handleClick}>
                                <a href="/">
                                    {/* data-bs-toggle="modal" data-bs-target="#sendActionSheet" */}
                                    <div className="icon-wrapper bg-success">
                                        <ion-icon name="phone-portrait-outline"></ion-icon>
                                    </div>
                                    <strong>Phone Pay</strong>
                                </a>
                            </div>
                            <div className="item" onClick={handleClick}>
                                <a href="/">
                                    {/* data-bs-toggle="modal" data-bs-target="#exchangeActionSheet" */}
                                    <div className="icon-wrapper bg-warning">
                                        <ion-icon name="hand-left-outline"></ion-icon>
                                    </div>
                                    <strong>Cash in hand</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="row mt-2">
                        <div className="col-6">
                            <div className="stat-box">
                                <div className="title">Income</div>
                                <div className="value text-success">{income}</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="stat-box">
                                <div className="title">Fine</div>
                                <div className="value text-danger">{fine}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6">
                            <div className="stat-box">
                                <div className="title">Withdraw</div>
                                <div className="value">{withdraw}</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="stat-box">
                                <div className="title">Balance</div>
                                <div className="value">{balance}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* notification */}
                <div className="section mt-4">
                    <div className="section-heading">
                        <h2 className="title">Notifications</h2>
                    </div>

                    {notifications.length > 0 ? (
                        <div className='notification bg-black rounded text-light'>
                            <ul>
                                {notifications.map((notification) => (
                                    <li key={notification._id}>
                                        {notification.notification.notification}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="no-notifications-message">
                            No notifications available now.
                        </div>
                    )}
                </div>



                {/* transaction */}
                <div className="section mt-4">
                    <div className="section-heading">
                        <h2 className="title">Transactions</h2>
                        <Link to="/transactions" className="link">View All</Link>
                    </div>
                    {Array.isArray(mergedDetails) && mergedDetails.length > 0 ? (
                        mergedDetails.slice(0, 3).map((detail, index) => (

                            <div className="section" key={index}>
                                <div className="section-title">
                                    Date: {`${new Date(detail.date).getDate()}-${new Date(detail.date).getMonth() + 1}-${new Date(detail.date).getFullYear()}`}
                                </div>
                                <div className="transactions">
                                    <Link to="/" className="item">
                                        <div className="detail">
                                            {
                                                detail.finefor ? (
                                                    <img src="transaction/fine.jpg" alt="img" className="image-block imaged w48" />
                                                ) : detail.otfor ? (
                                                    <img src="transaction/ot.jpg" alt="img" className="image-block imaged w48" />
                                                ) : detail.tefor ? (
                                                    <img src="transaction/te.jpg" alt="img" className="image-block imaged w48" />
                                                ) : detail.amount ? (
                                                    <img src="transaction/withdraw.jpg" alt="img" className="image-block imaged w48" />
                                                ) : (
                                                    <img src="transaction/salary.jpg" alt="img" className="image-block imaged w48" />
                                                )
                                            }
                                            ,
                                            <div>
                                                {detail.finefor ? (
                                                    <strong>Fine for: {detail.finefor}</strong>
                                                ) : detail.otfor ? (
                                                    <strong>OT for: {detail.otfor}</strong>
                                                ) : detail.tefor ? (
                                                    <strong>Te for: {detail.tefor}</strong>
                                                ) : detail.amount ? (
                                                    <strong>withdraw for: Personal</strong>
                                                ) : (
                                                    <strong>Salary of Event: {detail.events}</strong>
                                                )},

                                            </div>
                                        </div>
                                        <div className="right">
                                            {detail.fine ? (
                                                <div className="price text-danger">₹ {detail.fine}</div>
                                            ) : detail.ot ? (
                                                <div className="price text-success">₹ {detail.ot}</div>
                                            ) : detail.te ? (
                                                <div className="price text-success">₹ {detail.te}</div>
                                            ) : detail.amount ? (
                                                <div className="price text-danger">₹ {detail.amount}</div>
                                            ) : (
                                                <div className="price text-success">₹ {detail.salary}</div>
                                            )},

                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="section">
                            <div className="section-title">No details available.</div>
                        </div>
                    )
                    }
                </div>

                {/* work */}

                {/* main boys */}
                {(role === "admin" || role === "main-boy" || role === 'captain') && events.some(event => event.slotMain > 0) && (
                    <div className="section full mt-2">
                        <div className="section-heading padding">
                            <h2 className="title">Works for Main boy</h2>
                            <Link to="/events" className="link">View All</Link>
                        </div>
                        <div className='slider-container'>
                            <div
                                className='slider-box'
                                ref={sliderRef}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onMouseMove={handleMouseMove}
                            >
                                {events.map((event, index) => (
                                    // Only render the card if event.slotMain is greater than zero
                                    event.slotMain > 0 && (
                                        <div
                                            className={`boxes ${bootstrapColors[index % bootstrapColors.length]}`}
                                            key={index}
                                        >
                                            <div className="card-main">

                                                <div className="balance m-2">
                                                    <span className="label text-secondary">Location of site</span>
                                                    <h1 className="title text-light">{event.location}</h1>
                                                </div>

                                                <div className="in ms-2 d-flex">
                                                    <div className="card-number">
                                                        <span className="label text-secondary">Date of site</span>
                                                        <br />
                                                        <h2 className='text-light'>{event.date}</h2>
                                                    </div>
                                                    <div className="bottom">
                                                        <div className="card-number ms-4">
                                                            <span className="label text-secondary">Reporting time</span>
                                                            <h2 className='text-light'>{event.time}</h2>

                                                        </div>
                                                        <div className="card-expiry slot">
                                                            <span className="label text-secondary">Slots Available</span>
                                                            <h2 className='text-light'>{event.slotMain}</h2>
                                                        </div>
                                                    </div>

                                                    {Array.isArray(isEvent) && isEvent.includes(event._id) ? (
                                                        <button className="rounded btn btn-success" disabled>
                                                            ✔
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-warning rounded" onClick={() => handleAddButtonClickMain(event._id)}>
                                                            Add
                                                        </button>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}



                {/* supervisors */}
                {(role === "admin" || role === "main-boy" || role === 'supervisor' || role === 'captain') && events.some(event => event.slotSuper > 0) && (
                    <div className="section full mt-2">
                        <div className="section-heading padding">
                            <h2 className="title">Works for Supervisors</h2>
                            <Link to="/events" className="link">View All</Link>
                        </div>
                        <div className='slider-container'>
                            <div
                                className='slider-box'
                                ref={sliderRef}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onMouseMove={handleMouseMove}
                            >
                                {events.map((event, index) => (
                                    // Only render the card if event.slotSuper is greater than zero
                                    event.slotSuper > 0 && (
                                        <div
                                            className={`boxes ${bootstrapColors[index % bootstrapColors.length]}`}
                                            key={index}
                                        >
                                            <div className="card-main">

                                                <div className="balance m-2">
                                                    <span className="label text-secondary">Location of site</span>
                                                    <h1 className="title text-light">{event.location}</h1>
                                                </div>

                                                <div className="in ms-2 d-flex">
                                                    <div className="card-number">
                                                        <span className="label text-secondary">Date of site</span>
                                                        <br />
                                                        <h2 className='text-light'>{event.date}</h2>
                                                    </div>
                                                    <div className="bottom">
                                                        <div className="card-number ms-4">
                                                            <span className="label text-secondary">Reporting time</span>
                                                            <h2 className='text-light'>{event.time}</h2>
                                                        </div>
                                                        <div className="card-expiry slot">
                                                            <span className="label text-secondary">Slots Available</span>
                                                            <h2 className='text-light'>{event.slotSuper}</h2>
                                                        </div>
                                                    </div>

                                                    {Array.isArray(isEvent) && isEvent.includes(event._id) ? (
                                                        <button className="rounded btn btn-success" disabled>
                                                            ✔
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-warning rounded" onClick={() => handleAddButtonClickSuper(event._id)}>
                                                            Add
                                                        </button>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}



                {/* boys */}
                <div className="section full mt-2">
                    <div className="section-heading padding">
                        <h2 className="title">Works for Boys</h2>
                        <Link to="/events" className="link">View All</Link>
                    </div>


                    <div className='slider-container'>
                        <div
                            className='slider-box'
                            ref={sliderRef}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onMouseMove={handleMouseMove}
                        >
                            {events.map((event, index) => (
                                // Only render the card if event.slot is greater than zero
                                event.slot > 0 && (
                                    <div
                                        className={`boxes ${bootstrapColors[index % bootstrapColors.length]}`}
                                        key={index}
                                    >
                                        <div className="card-main">

                                            <div className="balance m-2">
                                                <span className="label text-secondary">Location of site</span>
                                                <h1 className="title text-light">{event.location}</h1>
                                            </div>

                                            <div className="in ms-2 d-flex">
                                                <div className="card-number">
                                                    <span className="label text-secondary">Date of site</span>
                                                    <br />
                                                    <h2 className='text-light'>{event.date}</h2>
                                                </div>
                                                <div className="bottom">
                                                    <div className="card-number ms-4">
                                                        <span className="label text-secondary">Reporting time</span>
                                                        <h2 className='text-light'>{event.time}</h2>
                                                    </div>
                                                    <div className="card-expiry slot">
                                                        <span className="label text-secondary">Slots Available</span>
                                                        <h2 className='text-light'>{event.slotSuper}</h2>
                                                    </div>
                                                </div>

                                                {Array.isArray(isEvent) && isEvent.includes(event._id) ? (
                                                    <button className="rounded btn btn-success" disabled>
                                                        ✔
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-warning rounded" onClick={() => handleAddButtonClick(event._id)}>
                                                        Add
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>


                    <div >
                        {showButton && (
                            <div>
                                <Link to='/sitedetails' className=' btn btn-success'>
                                    Site details
                                </Link>
                            </div>
                        )}
                    </div>



                    <div class="appFooter">
                        <div class="footer-title">
                            App by @ tafcon
                        </div>

                    </div>
                </div >
            </div>

            {/* body */}
            {/* footer */}
            < div className="appBottomMenu" >
                <Link to="/" className="item active">
                    <div className="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" id="piechart"><g fill="#FFB400 "><path d="M29 17.518a.5.5 0 0 0-.5-.5H15V3.5a.5.5 0 0 0-.5-.5C6.505 3 0 9.495 0 17.479 0 25.757 6.243 32 14.521 32 22.234 32 29 25.232 29 17.518zm-28-.039c0-7.266 5.787-13.206 13-13.47v13.509c0 .276.224.5.5.482h13.49c-.283 6.99-6.455 13-13.469 13C6.813 31 1 25.188 1 17.479z">
                        </path><path d="M17.5 15h13.999c.276.018.501-.224.501-.5C32 6.505 25.495 0 17.5 0a.5.5 0 0 0-.5.5v14.018c0 .276.224.5.5.482zM18 1.009c7.063.259 12.759 5.97 12.994 13.009H18V1.009z"></path></g></svg>



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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="apps">
                            <path fill="none" d="M0 0h24v24H0Z" data-name="Path 3624"></path><path fill="#525863"
                                d="M16.362 18.256a1.9 1.9 0 1 1 1.895 1.9 1.894 1.894 0 0 1-1.895-1.9Zm-6.229 0a1.895 1.895 0 1 1 1.895 1.9 1.894 1.894 0 0 1-1.895-1.9Zm-6.232 0a1.9 1.9 0 1 1 1.895 1.9 1.894 1.894 0 0 1-1.896-1.9Zm12.461-6.229a1.9 1.9 0 1 1 1.895 1.894 1.9 1.9 0 0 1-1.895-1.894Zm-6.229 0a1.895 1.895 0 1 1 1.895 1.894 1.9 1.9 0 0 1-1.895-1.894Zm-6.232 0a1.9 1.9 0 1 1 1.895 1.894A1.9 1.9 0 0 1 3.9 12.027Zm12.461-6.233a1.9 1.9 0 1 1 1.895 1.9 1.894 1.894 0 0 1-1.895-1.9Zm-6.229 0a1.895 1.895 0 1 1 1.895 1.9 1.894 1.894 0 0 1-1.895-1.9Zm-6.232 0a1.9 1.9 0 1 1 1.895 1.9 1.894 1.894 0 0 1-1.896-1.9Z" data-name="Path 2657"></path></svg>                        <strong>My Bookings</strong>
                    </div>
                </Link>
                <Link to="/events" className="item">
                    <div className="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="atm-card"><path d="M5.5,18.623h13c1.378,0,2.5-1.122,2.5-2.5V8.487v-0.61c0-1.378-1.122-2.5-2.5-2.5h-13c-1.378,0-2.5,1.122-2.5,2.5v0.61
	v7.635C3,17.501,4.122,18.623,5.5,18.623z M20,16.123c0,0.827-0.673,1.5-1.5,1.5h-13c-0.827,0-1.5-0.673-1.5-1.5V8.987h16V16.123z
	 M4,7.877c0-0.827,0.673-1.5,1.5-1.5h13c0.827,0,1.5,0.673,1.5,1.5v0.11H4V7.877z"></path><path d="M6,14.125h4.313c0.276,0,0.5-0.224,0.5-0.5s-0.224-0.5-0.5-0.5H6c-0.276,0-0.5,0.224-0.5,0.5S5.724,14.125,6,14.125z"></path></svg>                            <strong>Event</strong>
                    </div>
                </Link>
                <Link to="/settings" className="item">
                    <div className="col">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 128 128" width="25" height="25" viewBox="0 0 128 128" id="settings" stroke='#525863'>
                            <path fill="#525863" d="M65.8,84.9c1.2,2.1,3,3.8,5,5c1.2,0.7,2.5,1.3,3.9,1.6c1.1,0.3,2.3,0.4,3.6,0.4c1.2,0,2.4-0.2,3
                            .6-0.4
				c1.4-0.3,2.7-0.9,3.9-1.6c2.1-1.2,3.8-3,5-5c0.7-1.2,1.3-2.5,1.6-3.9c0.3-1.1,0.4-2.3,0.4-3.6c0-1.2-0.2-2.4-0.4-3.6
				c-0.3-1.4-0.9-2.7-1.6-3.9c-1.2-2.1-3-3.8-5-5c-1.2-0.7-2.5-1.3-3.9-1.6c-1.1-0.3-2.3-0.4-3.6-0.4c-1.2,0-2.4,0.2-3.6,0.4
				c-1.4,0.3-2.7,0.9-3.9,1.6c-2.1,1.2-3.8,3-5,5c-0.7,1.2-1.3,2.5-1.6,3.9c-0.3,1.1-0.4,2.3-0.4,3.6c0,1.2,0.2,2.4,0.4,3.6
				C64.5,82.4,65.1,83.7,65.8,84.9z"></path><path fill="#525863" d="M119.6,71h-2.9c-1-5.9-3.3-11.4-6.7-16.1l2-2c2.5-2.5,2.5-6.6,0-9.2c-2.5-2.5-6.7-2.5-9.2,0l-2,2
				C96.2,42.3,90.7,40,84.8,39v-2.9c0-3.6-2.9-6.5-6.5-6.5c-1.9,0-3.6,0.8-4.8,2.2c0.8,1.4,1.2,3,1.2,4.7c0,4.6-3.3,8.5-7.6,9.5
				c-0.6,2.1-1.4,4.1-2.5,5.9c0.5,0.7,0.8,1.5,1.1,2.3c1.9-1,4-1.9,6.1-2.4c2.1-0.5,4.3-0.8,6.5-0.8s4.4,0.3,6.5,0.8
				c2.5,0.6,4.9,1.6,7,2.9c3.8,2.2,6.9,5.4,9.2,9.2c1.3,2.2,2.3,4.5,2.9,7c0.5,2.1,0.8,4.3,0.8,6.5c0,2.2-0.3,4.4-0.8,6.5
				c-0.6,2.5-1.6,4.9-2.9,7c-2.2,3.8-5.4,6.9-9.2,9.2c-2.2,1.3-4.5,2.3-7,2.9c-2.1,0.5-4.3,0.8-6.5,0.8s-4.4-0.3-6.5-0.8
				c-2.5-0.6-4.9-1.6-7-2.9c-3.8-2.2-6.9-5.4-9.2-9.2c-1.3-2.2-2.3-4.5-2.9-7c-0.5-2.1-0.8-4.3-0.8-6.5c0-2.2,0.3-4.4,0.8-6.5
				c0.4-1.5,0.9-3,1.5-4.4c-1.1-0.3-2.1-0.7-3-1.3c-1.9,1-3.9,1.8-5.9,2.5c-0.9,4.4-4.8,7.6-9.5,7.6c-1.6,0-3.1-0.4-4.5-1.1
				c-0.5,0.9-0.8,2-0.8,3.1c0,3.6,2.9,6.5,6.5,6.5h2.9c1,5.9,3.3,11.4,6.7,16.1l-2,2c-2.5,2.5-2.5,6.6,0,9.2
				c1.3,1.3,2.9,1.9,4.6,1.9c1.7,0,3.3-0.6,4.6-1.9l2-2c4.7,3.3,10.2,5.7,16.1,6.7v2.9c0,3.6,2.9,6.5,6.5,6.5c3.6,0,6.5-2.9,6.5-6.5
				v-2.9c5.9-1,11.4-3.3,16.1-6.7l2,2c1.3,1.3,2.9,1.9,4.6,1.9c1.7,0,3.3-0.6,4.6-1.9c2.5-2.5,2.5-6.7,0-9.2l-2-2
				c3.3-4.7,5.7-10.2,6.7-16.1h2.9c3.6,0,6.5-2.9,6.5-6.5C126.1,73.9,123.2,71,119.6,71z"></path><path fill="#525863" d="M31.1,65.7c0,2.5,2.1,4.6,4.6,4.6c2.5,0,4.6-2.1,4.6-4.6v-2c4.2-0.7,8.1-2.3,11.4-4.7l1.4,1.4
					c0.9,0.9,2.1,1.3,3.2,1.3c1.2,0,2.3-0.4,3.2-1.3c1.8-1.8,1.8-4.7,0-6.5l-1.4-1.4c2.4-3.3,4-7.2,4.7-11.4h2
					c2.5,0,4.6-2.1,4.6-4.6c0-2.5-2.1-4.6-4.6-4.6h-2c-0.7-4.2-2.4-8.1-4.7-11.4l1.4-1.4c1.8-1.8,1.8-4.7,0-6.5
					c-1.8-1.8-4.7-1.8-6.5,0L51.7,14c-3.3-2.4-7.2-4-11.4-4.7v-2c0-2.5-2.1-4.6-4.6-4.6c-2.5,0-4.6,2.1-4.6,4.6v2
					C27,10,23.1,11.7,19.8,14l-1.4-1.4c-1.8-1.8-4.7-1.8-6.5,0c-1.8,1.8-1.8,4.7,0,6.5l1.4,1.4c-2.4,3.3-4,7.2-4.7,11.4h-2
					c-2.5,0-4.6,2.1-4.6,4.6c0,2.5,2.1,4.6,4.6,4.6h2c0.7,4.2,2.3,8.1,4.7,11.4l-1.4,1.4c-1.8,1.8-1.8,4.7,0,6.5
					c0.9,0.9,2.1,1.3,3.2,1.3c1.2,0,2.4-0.4,3.2-1.3l1.4-1.4c3.3,2.4,7.2,4,11.4,4.7V65.7z M28.1,49.3c-2.1-1.3-3.9-3-5.2-5.2
					c-0.7-1.2-1.3-2.5-1.6-4c-0.3-1.2-0.5-2.4-0.5-3.6c0-1.3,0.2-2.5,0.5-3.6c0.4-1.4,0.9-2.7,1.6-4c1.3-2.1,3-3.9,5.2-5.2
					c1.2-0.7,2.5-1.3,4-1.6c1.2-0.3,2.4-0.5,3.6-0.5c1.3,0,2.5,0.2,3.6,0.5c1.4,0.4,2.7,0.9,4,1.6c2.1,1.3,3.9,3,5.2,5.2
					c0.7,1.2,1.3,2.5,1.6,4c0.3,1.2,0.5,2.4,0.5,3.6c0,1.3-0.2,2.5-0.5,3.6c-0.4,1.4-0.9,2.7-1.6,4c-1.3,2.1-3,3.9-5.2,5.2
					c-1.2,0.7-2.5,1.3-4,1.6c-1.2,0.3-2.4,0.5-3.6,0.5c-1.3,0-2.5-0.2-3.6-0.5C30.7,50.6,29.4,50,28.1,49.3z"></path></svg>
                        <strong>Settings</strong>
                    </div>
                </Link>
            </ div>
            {/* footer */}
        </div >







    );
}

export default Home;
