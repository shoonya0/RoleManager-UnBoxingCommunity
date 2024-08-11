import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, roles = [] }) => {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        console.error('Failed to parse user from localStorage', error);
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!roles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;