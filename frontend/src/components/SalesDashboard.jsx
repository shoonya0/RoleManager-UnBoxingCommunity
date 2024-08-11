import React, { useState } from 'react';
import axios from 'axios';
import './sales.css';

const SalesDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [billings, setBillings] = useState([]);
    const [searchCustomerId, setSearchCustomerId] = useState('');
    const [searchBillingId, setSearchBillingId] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [customerData, setCustomerData] = useState({ name: '', email: '' });
    const [billingData, setBillingData] = useState({ amount: '', customer_id: '' });
    const token = localStorage.getItem('token');

    // Fetch single customer by ID
    const fetchCustomerById = async () => {
        try {
            const response = await axios.get(`http://localhost:3231/sales/customer/${searchCustomerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCustomers([response.data.user]);
        } catch (error) {
            console.error('Error fetching customer by ID:', error);
        }
    };

    // Fetch customers by email or all customers
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:3231/sales/customers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: searchEmail ? { email: searchEmail } : {},
            });
            setCustomers(response.data.customers || []);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Create a new customer
    const createCustomer = async () => {
        try {
            const response = await axios.post('http://localhost:3231/sales/customer', customerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCustomers([...customers, response.data.user]);
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    // Update a customer by ID
    const updateCustomer = async () => {
        try {
            const response = await axios.put(`http://localhost:3231/sales/customer/${searchCustomerId}`, customerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCustomers(customers.map(c => c.ID === response.data.user.ID ? response.data.user : c));
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    // Fetch single billing by ID
    const fetchBillingById = async () => {
        try {
            const response = await axios.get(`http://localhost:3231/sales/billing/${searchBillingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBillings([response.data.billing]);
        } catch (error) {
            console.error('Error fetching billing by ID:', error);
        }
    };

    // Fetch billings by customer_id or all billings
    const fetchBillings = async () => {
        try {
            const response = await axios.get('http://localhost:3231/sales/billings', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: billingData.customer_id ? { customer_id: billingData.customer_id } : {},
            });
            setBillings(response.data.billings || []);
        } catch (error) {
            console.error('Error fetching billings:', error);
        }
    };

    // Create a new billing
    const createBilling = async () => {
        try {
            const response = await axios.post('http://localhost:3231/sales/billing', billingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBillings([...billings, response.data.billing]);
        } catch (error) {
            console.error('Error creating billing:', error);
        }
    };

    // Update a billing by ID
    const updateBilling = async () => {
        try {
            const response = await axios.put(`http://localhost:3231/sales/billing/${searchBillingId}`, billingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBillings(billings.map(b => b.ID === response.data.billing.ID ? response.data.billing : b));
        } catch (error) {
            console.error('Error updating billing:', error);
        }
    };

    return (
        <div className="sales-dashboard-container">
            <h2>Sales Dashboard</h2>

            {/* Customer Operations */}
            <div className="section">
                <h3>Customers</h3>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter Customer ID"
                        value={searchCustomerId}
                        onChange={(e) => setSearchCustomerId(e.target.value)}
                    />
                    <button onClick={fetchCustomerById}>Search by ID</button>
                    <input
                        type="text"
                        placeholder="Enter Customer Email"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <button onClick={fetchCustomers}>Search by Email</button>
                </div>
                <div className="customer-form">
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
                    <button onClick={createCustomer}>Create Customer</button>
                    <button onClick={updateCustomer}>Update Customer</button>
                </div>
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
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

            {/* Billing Operations */}
            <div className="section">
                <h3>Billings</h3>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Enter Billing ID"
                        value={searchBillingId}
                        onChange={(e) => setSearchBillingId(e.target.value)}
                    />
                    <button onClick={fetchBillingById}>Search Billing by ID</button>
                    <input
                        type="text"
                        placeholder="Enter Customer ID"
                        value={billingData.customer_id}
                        onChange={(e) => setBillingData({ ...billingData, customer_id: e.target.value })}
                    />
                    <button onClick={fetchBillings}>Search Billings by Customer ID</button>
                </div>
                <div className="billing-form">
                    <input
                        type="number"
                        placeholder="Billing Amount"
                        value={billingData.amount}
                        onChange={(e) => setBillingData({ ...billingData, amount: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Customer ID"
                        value={billingData.customer_id}
                        onChange={(e) => setBillingData({ ...billingData, customer_id: e.target.value })}
                    />
                    <button onClick={createBilling}>Create Billing</button>
                    <button onClick={updateBilling}>Update Billing</button>
                </div>
                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Customer ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billings.map((billing) => (
                            <tr key={billing.ID}>
                                <td>{billing.ID}</td>
                                <td>{billing.amount}</td>
                                <td>{billing.customer_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesDashboard;
