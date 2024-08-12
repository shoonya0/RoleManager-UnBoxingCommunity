import React, { useState } from 'react';
import axios from 'axios';
import '../admin/universal.css';


const UpdateCustomer = () => {
    const [customerId, setCustomerId] = useState('');
    const [customerData, setCustomerData] = useState({ name: '', email: '' });
    const token = localStorage.getItem('token');

    const updateCustomer = async () => {
        try {
            await axios.put(`http://localhost:3231/sales/customer/${customerId}`, customerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Customer updated successfully!');
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <div>
            <h3>Update Customer</h3>
            <input
                type="text"
                placeholder="Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
            />
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
            <button onClick={updateCustomer}>Update</button>
        </div>
    );
};

export default UpdateCustomer;
