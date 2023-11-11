import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ViewTe() {
    const { user_id } = useParams();
    const eventId = new URLSearchParams(window.location.search).get('eventId');
    const [values, setValues] = useState({ tefor: '', te: '' });
    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get(`/viewte/${user_id}?eventId=${eventId}`)
            .then((res) => {

                setValues(res.data.te);
            })
            .catch((error) => {
                console.error(error);
                navigate('/login')
            });

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/viewte/${user_id}?eventId=${eventId}`, { values }).then((res) => {
            if (res.data) {
                navigate(-1)
            } else {
                alert('not updated')
            }
        });
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                    <form onSubmit={handleSubmit}>
                        <legend>Edit TE</legend>
                        <div className="form-group mt-4">
                            <label htmlFor="teFor">Travel expense for</label>
                            <input
                                type="text"
                                className="form-control"
                                name="tefor"
                                id="te for"
                                placeholder="te For"
                                value={values.tefor || ''}
                                onChange={(e) =>
                                    setValues({ ...values, tefor: e.target.value })
                                }

                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="te"> Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                name="te"
                                id="te"
                                placeholder="te"
                                value={values.te || ''}
                                onChange={(e) =>
                                    setValues({ ...values, te: e.target.value })
                                }
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ViewTe