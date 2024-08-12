import React, { useState } from 'react';
import axios from 'axios';
import '../admin/universal.css';

const UpdateBilling = () => {
    const [billingId, setBillingId] = useState('');
    const [billingData, setBillingData] = useState({ amount: '', customer_id: '' });
    const token = localStorage.getItem('token');

    const updateBilling = async () => {
        if (!billingId || !billingData.amount || !billingData.customer_id) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await axios.put(`http://localhost:3231/sales/billing/${billingId}`, {
                amount: parseFloat(billingData.amount),
                customer_id: parseInt(billingData.customer_id),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Billing updated successfully!');
            setBillingId('');
            setBillingData({ amount: '', customer_id: '' });
        } catch (error) {
            console.error('Error updating billing:', error);
            alert('Failed to update billing. Please try again.');
        }
    };

    return (
        <div className="update-billing-container">
            <h3>Update Billing</h3>
            <div className="input-field">
                <input
                    type="text"
                    placeholder="Billing ID"
                    value={billingId}
                    onChange={(e) => setBillingId(e.target.value)}
                />
            </div>
            <div className="input-field">
                <input
                    type="number"
                    placeholder="Billing Amount"
                    value={billingData.amount}
                    onChange={(e) => setBillingData({ ...billingData, amount: e.target.value })}
                />
            </div>
            <div className="input-field">
                <input
                    type="text"
                    placeholder="Customer ID"
                    value={billingData.customer_id}
                    onChange={(e) => setBillingData({ ...billingData, customer_id: e.target.value })}
                />
            </div>
            <button className="update-button" onClick={updateBilling}>Update</button>
        </div>
    );
};

export default UpdateBilling;
