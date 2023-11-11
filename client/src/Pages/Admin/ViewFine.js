import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ViewFine() {
    const { user_id } = useParams();
    const eventId = new URLSearchParams(window.location.search).get('eventId');
    const [values, setValues] = useState({ finefor: '', fine: '' });
    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get(`/viewfine/${user_id}?eventId=${eventId}`)
            .then((res) => {
                console.log(res.data.fine);
                setValues(res.data.fine);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [user_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/viewfine/${user_id}?eventId=${eventId}`, { values }).then((res) => {
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
                        <legend>Edit Fine</legend>
                        <div className="form-group mt-4">
                            <label htmlFor="fineFor">Fine for</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fineFor"
                                id="fineFor"
                                placeholder="Fine For"
                                value={values.finefor || ''}
                                onChange={(e) =>
                                    setValues({ ...values, finefor: e.target.value })
                                }

                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="fine">Fine amount</label>
                            <input
                                type="number"
                                className="form-control"
                                name="fine"
                                id="fine"
                                placeholder="Fine"
                                value={values.fine || ''}
                                onChange={(e) =>
                                    setValues({ ...values, fine: e.target.value })
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
    );
}

export default ViewFine;
