import React, { useContext } from 'react';
import { AuthContext } from '../Authintaction paige/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PraivetRoute = ({ children }) => {
    const location = useLocation()
    const { users } = useContext(AuthContext)
    
    if (users) {
        return children
    }
    return <Navigate state={location.pathname} to={`/signin`}></Navigate>;
};

export default PraivetRoute;