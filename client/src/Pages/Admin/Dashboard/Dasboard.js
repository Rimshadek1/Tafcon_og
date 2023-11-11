import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import './Dashboard.css'
import { Link } from 'react-router-dom';
const localizer = momentLocalizer(moment);

function Dashboard() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/calendar').then((res) => {
            if (res.data && Array.isArray(res.data.events)) {
                const formattedEvents = res.data.events.map((event) => ({
                    title: event.event,
                    start: new Date(event.date), // Assuming date is in ISO format
                    end: new Date(event.date),   // Same as start for all-day events
                    ref: event.ref,
                    location: event.location,
                }));

                setEvents(formattedEvents);
            }
        });
    }, []);
    const EventDisplay = ({ event }) => (
        <div>
            <strong>{event.title}</strong>
            <br />
            <div><strong>Location:</strong> {event.location}</div>
            <div><strong>Ref:</strong> {event.ref}</div>
        </div>
    );


    return (
        <div>
            <div className="row mt-5 mb-4">
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
            </div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                // style={{ height: 300 }}
                components={{
                    event: EventDisplay,

                }}
                style={{
                    marginLeft: '80px',
                    height: 600,
                    width: 800,
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                }}

                onSelectEvent={(event) => {
                    alert(`Event Ref: ${event.ref}, Event Location:${event.location}`);
                }}
            />
        </div>
    );
}

export default Dashboard;
