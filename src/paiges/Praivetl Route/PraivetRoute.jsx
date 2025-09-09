import React, { useContext } from 'react';
import { AuthContext } from '../Authintaction paige/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    if (user) {
        return children;
    }

    // Pass the current location in state.from
    return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
