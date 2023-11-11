import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import './otp.css';
import { Link } from 'react-router-dom';

function Otp() {
    const [isLoading] = useState(true);

    useEffect(() => {
        // Simulate an asynchronous process (e.g., making an API request)
        const loadingTimeout = setTimeout(() => {
            // Perform your asynchronous operation here

            // Clear the loadingTimeout when your process is done
            clearTimeout(loadingTimeout);
        }, 2000); // Adjust the time as needed
    }, []);

    return (
        <div>
            <div id="appCapsule">
                <div className="section mt-4 text-center">
                    <h1>Registration Request</h1>
                    <h4>Your request is under process...</h4>
                </div>
                <div className="section mb-5 p-2 loader">
                    {isLoading ? (
                        <LoadingSpinner /> // Display the loading spinner while isLoading is true
                    ) : (
                        // Render your content when isLoading is false
                        <div>
                            {/* Your page content */}
                        </div>
                    )}
                </div>
                <p className="text-center ">
                    <h4> Your verification is currently being processed by our event managers.
                        Occasionally, our team may contact you for the verification process, please be
                        assured that this is purely for verification purposes and does not involve any request for
                        payment. Kindly wait until the verification is complete, and you will be able to log in
                        once the process has finished.</h4>
                </p>
                <p className="text-center "> Login only works after verification</p>
                <Link to='/login' className='btn btn-success btn-block btn-lg'>
                    Login
                </Link>

            </div>
        </div >
    );
}

export default Otp;
