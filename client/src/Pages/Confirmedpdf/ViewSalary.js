import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ViewSalary() {
    const { user_id } = useParams();
    const eventId = new URLSearchParams(window.location.search).get('eventId');
    const navigate = useNavigate();
    const [salary, setSalary] = useState({});

    useEffect(() => {
        // Fetch the initial salary data and set it to the state
        axios
            .get(`/viewsalary/${user_id}?eventId=${eventId}`)
            .then((res) => {
                console.log(res.data.salary);
                setSalary(res.data.salary.salary);
            })
            .catch((error) => {
                console.error(error);
                navigate('/login')
            });
    }, [user_id, eventId]); // Include user_id and eventId in the dependency array

    const handleUpdateSalary = () => {
        // Send the updated salary to the server
        axios
            .post(`/viewsalary/${user_id}?eventId=${eventId}`, { salary })
            .then((res) => {
                if (res.data) {
                    navigate(-1);
                } else {
                    alert('Not updated');
                }
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                    <form>
                        <legend>Edit Salary</legend>
                        <div className="form-group mt-2">
                            <label htmlFor="salary">Salary amount</label>
                            <input
                                type="number"
                                className="form-control"
                                name="salary"
                                id="salary"
                                placeholder={salary}
                                value={salary || ''}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-primary mt-2" onClick={handleUpdateSalary}>
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewSalary;
