import React, { useState } from 'react';
import '../admin/universal.css';

const CreateBilling = () => {
    const [employee_name, setCustomerId] = useState('');
    const [salary, setAmount] = useState('');
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
                    employee_name: employee_name,
                    salary: parseFloat(salary),        // Convert to float to match `float64` type in Go
                    Status: status                     // Status is a string, so no conversion needed
                }),
            });
            console.log({
                employee_name: employee_name,
                salary: parseFloat(salary),        // Convert to float to match `float64` type in Go
                Status: status                     // Status is a string, so no conversion needed
            });
            if (response.ok) {
                alert('Billing created successfully!');
                setCustomerId('');
                setAmount('');
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
            <h3>Create Billing</h3>
            <form onSubmit={handleCreateBilling}>
                <input
                    type="text"
                    placeholder="Employee Name"
                    value={employee_name}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setAmount(e.target.value)}
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
