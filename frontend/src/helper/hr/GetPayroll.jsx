import React, { useState } from 'react';
import axios from 'axios';
import '../admin/universal.css';

const GetPayroll = () => {
    const [payroll, setPayroll] = useState(null);
    const [payrollId, setPayrollId] = useState('');
    const token = localStorage.getItem('token');

    const fetchPayroll = async () => {
        try {
            const response = await axios.get(`http://localhost:3231/hr/payroll/${payrollId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPayroll(response.data.payroll);
            console.log(response.data.payroll);
        } catch (error) {
            console.error('Error fetching payroll:', error);
        }
    };

    return (
        <div>
            <h3>Get Payroll</h3>
            <input
                type="text"
                placeholder="Payroll ID"
                value={payrollId}
                onChange={(e) => setPayrollId(e.target.value)}
            />
            <button onClick={fetchPayroll}>Get Payroll</button>
            {payroll && (
                <div>
                    <p>Employee Name: {payroll.employee_name}</p>
                    <p>Salary: {payroll.salary}</p>
                    <p>Status: {payroll.status}</p>
                </div>
            )}
        </div>
    );
};

export default GetPayroll;
