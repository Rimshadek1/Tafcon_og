import React from 'react'
import './Index.css'
import { Link } from 'react-router-dom'

function Index() {
    return (
        <div className='index'>
            <aside className="sidebar">
                <div className="logo">
                    <img src="muz/dp.jpg" alt="logo" />
                    <h2>Admin Panel</h2>
                </div>
                <ul className="links">
                    <h4>Main Menu</h4>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="#">Revenue</Link>
                    </li>
                    <li>
                        <Link to="#">Reports</Link>
                    </li>
                    <hr />
                    <h4>Advanced</h4>
                    <li>
                        <Link to="#">Designer</Link>
                    </li>
                    <li>
                        <Link to="#">Developer </Link>
                    </li>
                    <li>
                        <Link to="#">Magic Build</Link>
                    </li>
                    <li>
                        <Link to="#">Theme Maker</Link>
                    </li>
                    <li>
                        <Link to="#">Analytic</Link>
                    </li>
                    <hr />
                    <h4>Account</h4>
                    <li>
                        <Link to="#">Analytic</Link>                    </li>
                    <li>
                        <Link to="#">Analytic</Link>                    </li>
                    <li>
                        <Link to="#">Analytic</Link>                    </li>
                    <li className="logout-link">
                        <Link to="#">Analytic</Link>                    </li>
                </ul>
            </aside>
        </div >
    )
}

export default Index