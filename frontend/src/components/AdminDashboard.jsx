import React, { useState } from 'react';
import UserList from '../helper/UserList';
import CreateUser from '../helper/CreateUser';
import UpdateUser from '../helper/UpdateUser';

const AdminDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('UserList');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'UserList':
                return <UserList />;
            case 'CreateUser':
                return <CreateUser />;
            case 'UpdateUser':
                return <UpdateUser />;
            default:
                return <UserList />;
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={() => setActiveComponent('UserList')}>View Users</button>
            <button onClick={() => setActiveComponent('CreateUser')}>Create User</button>
            <button onClick={() => setActiveComponent('UpdateUser')}>Update User</button>
            {renderComponent()}
        </div>
    );
};

export default AdminDashboard;
