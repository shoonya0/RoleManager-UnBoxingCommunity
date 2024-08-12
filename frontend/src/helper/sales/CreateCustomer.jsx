import React, { useState } from 'react';
import axios from 'axios';
import '../admin/universal.css';


const CreateCustomer = () => {
    const [customerData, setCustomerData] = useState({ name: '', email: '' });
    const token = localStorage.getItem('token');

    const createCustomer = async () => {
        try {
            await axios.post('http://localhost:3231/sales/customer', customerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Customer created successfully!');
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    return (
        <div>
            <h3>Create Customer</h3>
            <input
                type="text"
                placeholder="Customer Name"
                value={customerData.name}
                onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Customer Email"
                value={customerData.email}
                onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
            />
            <button onClick={createCustomer}>Create</button>
        </div>
    );
};

export default CreateCustomer;
