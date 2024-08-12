import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../admin/universal.css';

const BillingList = () => {
    const [billings, setBillings] = useState([]);
    const [searchBilling_id, setSearchBillingId] = useState('');
    const [customer_id, setSearchCustomer_id] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBillings = async () => {
            try {
                let url = 'http://localhost:3231/sales/billings';
                if (searchBilling_id) {
                    url = `http://localhost:3231/sales/billing/${searchBilling_id}`;
                } else if (customer_id) {
                    url = `http://localhost:3231/sales/billings/${customer_id}`;
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Billings:', response.data.billings);
                setBillings(response.data.billings || []);
            } catch (error) {
                console.error('Error fetching billings:', error);
            }
        };

        fetchBillings();
    }, [searchBilling_id, customer_id]);

    return (
        <div className="customer-list-container">
            <h3>Billing List</h3>
            <div className="search-fields">
                {/* the search by id is not showing the data however it's showing in postman */}
                <input
                    type="text"
                    placeholder="Search by Billing Id"
                    value={searchBilling_id}
                    onChange={(e) => {
                        setSearchBillingId(e.target.value);
                        setSearchCustomer_id('');
                    }}
                />
                <input
                    type="text"
                    placeholder="Search by Customer ID"
                    value={customer_id}
                    onChange={(e) => {
                        setSearchCustomer_id(e.target.value);
                        setSearchBillingId('');
                    }}
                />
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Billing ID</th>
                        <th>Customer ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {billings.map((billing) => (
                        <tr key={billing.ID}>
                            <td>{billing.ID}</td>
                            <td>{billing.customer_id}</td>
                            <td>{billing.amount}</td>
                            <td>{new Date(billing.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillingList;
