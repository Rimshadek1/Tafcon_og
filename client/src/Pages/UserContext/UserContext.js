import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
    const authToken = "auibaekjbwea65136awibiba";
    const [username, setLoggedInUsername] = useState(null);
    const [id, setId] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/profile', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }).then(response => {
            if (response.data) {

                setId(response.data.userData.id);
                setLoggedInUsername(response.data.userData.number);
            } else {
                navigate('/login')
            }
        }).catch(error => {
            navigate('/login')
        });
    }, [])
    return (
        <UserContext.Provider value={{ username, setLoggedInUsername, id, setId }}> {/* Fix the variable name here as well */}
            {children}
        </UserContext.Provider>
    );
}


UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};