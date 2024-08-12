import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin/universal.css';


const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                let url = 'http://localhost:3231/sales/customers';
                if (searchId) {
                    url = `http://localhost:3231/sales/customer/${searchId}`;
                } else if (searchEmail) {
                    url = `http://localhost:3231/sales/customers/${searchEmail}`;
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCustomers(response.data.customers || [response.data.user]);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, [searchId, searchEmail]);

    return (
        <div className="customer-list-container">
            <h3>Customer List</h3>
            <div className="search-fields">
                <input
                    type="text"
                    placeholder="Search by ID"
                    value={searchId}
                    onChange={(e) => {
                        setSearchId(e.target.value);
                        setSearchEmail('');
                    }}
                />
                <input
                    type="text"
                    placeholder="Search by Email"
                    value={searchEmail}
                    onChange={(e) => {
                        setSearchEmail(e.target.value);
                        setSearchId('');
                    }}
                />
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.ID}>
                            <td>{customer.ID}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default CustomerList;
