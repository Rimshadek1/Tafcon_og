import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


function ViewOt() {
    const { user_id } = useParams();
    const eventId = new URLSearchParams(window.location.search).get('eventId');
    const [values, setValues] = useState({ otfor: '', ot: '' });
    const navigate = useNavigate();


    useEffect(() => {
        axios
            .get(`/viewot/${user_id}?eventId=${eventId}`)
            .then((res) => {
                console.log(res.data.ot);
                setValues(res.data.ot);
            })
            .catch((error) => {
                console.error(error);
                navigate('/login')
            });

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/viewot/${user_id}?eventId=${eventId}`, { values }).then((res) => {
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
                        <legend>Edit OT</legend>
                        <div className="form-group mt-4">
                            <label htmlFor="fineFor">Fine for</label>
                            <input
                                type="text"
                                className="form-control"
                                name="otfor"
                                id="otfor"
                                placeholder="ot For"
                                value={values.otfor || ''}
                                onChange={(e) =>
                                    setValues({ ...values, otfor: e.target.value })
                                }

                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="fine">Fine amount</label>
                            <input
                                type="number"
                                className="form-control"
                                name="ot"
                                id="ot"
                                placeholder="ot"
                                value={values.ot || ''}
                                onChange={(e) =>
                                    setValues({ ...values, ot: e.target.value })
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

export default ViewOt