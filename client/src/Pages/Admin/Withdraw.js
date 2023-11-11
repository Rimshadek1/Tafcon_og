import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Withdraw() {
    const [number, setNumber] = useState();
    const [amount, setAmount] = useState();
    const navigate = useNavigate();
    const handleSubmit = () => {
        axios.post('/withdraw', { number, amount }).then((res) => {
            if (res.data.status === 'success') {
                alert('withdraw success');
                navigate(-1)
            }
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 g-5">
                    <form onSubmit={handleSubmit}>
                        <legend>Withdraw</legend>

                        <div className="form-group mt-4">
                            <label htmlFor="number">Mobile number</label>
                            <input
                                type="number"
                                className="form-control"
                                name="number"
                                id="number"
                                placeholder="Mobile number of user"
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                name="amount"
                                id="amount"
                                placeholder="Amount to withdraw"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary mt-2">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Withdraw