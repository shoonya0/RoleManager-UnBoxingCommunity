import { useState } from 'react';
import axiosInstance from '../services/axiosInstance';

export const useAuth = () => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token'),
        role: null,
    });

    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post('http://localhost:3231/login', credentials);
            const token = response.data.token;

            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const role = tokenPayload.role;
            const username = tokenPayload.username;

            localStorage.setItem('token', token);
            setAuthState({ token, role });
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            localStorage.setItem('email', credentials.email);
            return true;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        setAuthState({ token: null, role: null });
    };

    return {
        authState,
        login,
        logout,
    };
};
