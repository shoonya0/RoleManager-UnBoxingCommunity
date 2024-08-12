import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './universal.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchAllUsers();
    }, []); // Fetch all users when the component mounts

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3231/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            let response;

            if (id) {
                // Fetch user by ID
                response = await axios.get(`http://localhost:3231/admin/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers([response.data.user]); // Set the single user in an array
            } else if (email) {
                // Fetch user by email
                response = await axios.get(`http://localhost:3231/admin/users/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers([response.data.user]); // Set the single user in an array
            } else {
                // If no ID or email, fetch all users
                fetchAllUsers();
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div className="user-list-container">
            <h3>User List</h3>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter ID to search"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter email to search"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={fetchUsers}>Search</button>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id || user.email}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
