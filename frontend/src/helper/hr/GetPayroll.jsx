import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin/universal.css';

const GetPayroll = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [payrollId, setPayrollId] = useState('');
    const token = localStorage.getItem('token');

    const fetchPayrolls = async () => {
        try {
            let url = 'http://localhost:3231/hr/payrolls';
            if (payrollId) {
                url = `http://localhost:3231/hr/payroll/${payrollId}`;
            }

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (payrollId) {
                setPayrolls([response.data.payroll]);
            } else {
                setPayrolls(response.data.payrolls);
            }
        } catch (error) {
            console.error('Error fetching payroll:', error);
            setPayrolls([]);
        }
    };

    useEffect(() => {
        fetchPayrolls();
    }, [payrollId]); // Re-run fetchPayrolls when payrollId changes

    return (
        <div>
            <h3>Get Payroll</h3>
            <input
                type="text"
                placeholder="Payroll ID"
                value={payrollId}
                onChange={(e) => setPayrollId(e.target.value)}
            />

            {payrolls.length > 0 ?
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Employee Name</th>
                            <th>Salary</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payrolls.map((payroll) => (
                            <tr key={payroll.ID}>
                                <td>{payroll.ID}</td>
                                <td>{payroll.employee_name}</td>
                                <td>{payroll.salary}</td>
                                <td>{payroll.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <p>No payrolls found</p>}
        </div>
    );
};

export default GetPayroll;
