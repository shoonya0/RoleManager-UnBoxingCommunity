import React, { useState } from 'react';
import axios from 'axios';
import '../admin/universal.css';

const UpdatePayroll = () => {
    const [payrollData, setPayrollData] = useState({ employee_name: '', salary: '', status: '' });
    const [payrollId, setPayrollId] = useState('');
    const token = localStorage.getItem('token');

    const updatePayroll = async () => {
        try {
            await axios.put(`http://localhost:3231/hr/payroll/${payrollId}`, payrollData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Payroll updated successfully!');
        } catch (error) {
            console.error('Error updating payroll:', error);
        }
    };

    return (
        <div>
            <h3>Update Payroll</h3>
            <input
                type="text"
                placeholder="Payroll ID"
                value={payrollId}
                onChange={(e) => setPayrollId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Employee Name"
                value={payrollData.employee_name}
                onChange={(e) => setPayrollData({ ...payrollData, employee_name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Salary"
                value={payrollData.salary}
                onChange={(e) => setPayrollData({ ...payrollData, salary: parseFloat(e.target.value) })}
            />
            <input
                type="text"
                placeholder="Status"
                value={payrollData.status}
                onChange={(e) => setPayrollData({ ...payrollData, status: e.target.value })}
            />
            <button onClick={updatePayroll}>Update</button>
        </div>
    );
};

export default UpdatePayroll;
