import React from 'react';

function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;
