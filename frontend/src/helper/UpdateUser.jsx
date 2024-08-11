import React, { useState } from 'react';
import './universal.css';

const UpdateUser = () => {
    const [id, setId] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3231/admin/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userName, email, role, password }),
            });

            if (response.ok) {
                alert('User updated successfully');
                setId('');
                setUserName('');
                setEmail('');
                setRole('');
                setPassword('');
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h3>Update User</h3>
            <form onSubmit={handleUpdateUser}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUser;
