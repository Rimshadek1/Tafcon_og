import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Editrole() {
    const { id } = useParams();
    const [values, setValues] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/edituser/${id}`).then((res) => {
            console.log(res.data);
            setValues(res.data.user);
        });
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/edituser/${id}`, values)
            .then((res) => {
                if (res.data.status === 'updated') {
                    navigate(-1)
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
                        <legend>You can Assign role of {values?.name || ''}  now!!!!</legend>

                        <div className="form-group mt-2">
                            <label htmlFor="Location">Role</label>
                            <select
                                className="form-control"
                                name="role"
                                id="role"
                                value={values?.role || ""}
                                onChange={e => setValues({ ...values, role: e.target.value })}
                            >
                                <option value="">Select Role</option>
                                <option value="A1">A1</option>
                                <option value="A2">A2</option>
                                <option value="A3">A3</option>
                                <option value="A4">A4</option>
                                <option value="A5">A5</option>
                                <option value="supervisor">Supervisor</option>
                                <option value="main-boy">Main Boy</option>
                                <option value="captain">Captain</option>
                            </select>
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

export default Editrole