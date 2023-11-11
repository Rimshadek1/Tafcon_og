import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Editevent() {
    const { id } = useParams();
    const [values, setValues] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/editbutton/${id}`).then((res) => {
            console.log(res.data);
            setValues(res.data.event);
        });
    }, [id]); // Make sure to add 'id' as a dependency in the useEffect
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/editbutton/${id}`, values)
            .then((res) => {
                if (res.data.status === 'updated') {

                    navigate('/viewevents')
                } else {
                    alert('not updated')
                }
            });
    }
    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form onSubmit={handleSubmit}>
                        <legend>Edit Event</legend>

                        <div className="form-group mt-2">
                            <label htmlFor="Location">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Location"
                                id="Location"
                                placeholder="Location"
                                value={values?.location || ""}
                                onChange={e => setValues({ ...values, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="Time">Time</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Time"
                                id="Time"
                                placeholder="Time"
                                value={values?.time || ""}
                                onChange={e => setValues({ ...values, time: e.target.value })}

                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="Date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="Date"
                                id="Date"
                                placeholder="Date"
                                value={values?.date || ""}
                                onChange={e => setValues({ ...values, date: e.target.value })}

                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="Event_name">Event Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Event_name"
                                placeholder="Event_name"
                                id="Event_name"
                                value={values?.event || ""}
                                onChange={e => setValues({ ...values, event: e.target.value })}

                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Event_name">Type of Event</label>
                            <input
                                type="text"
                                className="form-control"
                                name="Event_name"
                                placeholder="Event_name"
                                id="Event_name"
                                value={values?.type || ""}
                                onChange={e => setValues({ ...values, type: e.target.value })}

                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="Slot_leftcaptain">Slot Left for captain</label>
                            <input
                                type="number"
                                className="form-control"
                                name="Slot_leftcaptain"
                                placeholder="Slot_left for captain"
                                id="Slot_leftcaptain"
                                value={values?.slotCap || ""}
                                onChange={e => setValues({ ...values, slotCap: e.target.value })}

                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Slot_left_mainboy">Slot Left for Main body</label>
                            <input
                                type="number"
                                className="form-control"
                                name="Slot_left_mainboy"
                                placeholder="Slot_left for mainboy"
                                id="Slot_left_mainboy"
                                value={values?.slotMain || ""}
                                onChange={e => setValues({ ...values, slotMain: e.target.value })}

                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Slot_left_supervisor">Slot Left for supervisor</label>
                            <input
                                type="number"
                                className="form-control"
                                name="Slot_left_supervisor"
                                placeholder="Slot_left_supervisor"
                                id="Slot_left_supervisor"
                                value={values?.slotSuper || ""}
                                onChange={e => setValues({ ...values, slotSuper: e.target.value })}

                            />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="Slot_left">Slot Left</label>
                            <input
                                type="number"
                                className="form-control"
                                name="Slot_left"
                                placeholder="Slot_left"
                                id="Slot_left"
                                value={values?.slot || ""}
                                onChange={e => setValues({ ...values, slot: e.target.value })}

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

export default Editevent;
