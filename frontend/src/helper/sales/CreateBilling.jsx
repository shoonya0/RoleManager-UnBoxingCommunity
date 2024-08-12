import React, { useState } from 'react';
import '../admin/universal.css';

const CreateBilling = () => {
    const [amount, setAmount] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [status, setStatus] = useState('');
    const token = localStorage.getItem('token');

    const handleCreateBilling = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3231/sales/billing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    customer_id: parseInt(customerId), // Convert to integer to match `uint` type in Go
                    amount: parseFloat(amount),        // Convert to float to match `float64` type in Go
                    status: status                     // Status is a string, so no conversion needed
                }),
            });
            if (response.ok) {
                alert('Billing created successfully');
                setAmount('');
                setCustomerId('');
                setStatus('');
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error creating billing:', error);
        }
    };

    return (
        <div>
            <h3>Create New Billing</h3>
            <form onSubmit={handleCreateBilling}>
                <input
                    type="number"
                    placeholder="Billing Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Customer ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                />
                <button type="submit">Create Billing</button>
            </form>
        </div>
    );
};

export default CreateBilling;
