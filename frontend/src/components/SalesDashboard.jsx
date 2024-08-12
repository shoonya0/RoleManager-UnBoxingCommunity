import React, { useState } from 'react';
import CustomerList from '../helper/sales/CustomerList.jsx';
import CreateCustomer from '../helper/sales/CreateCustomer.jsx';
import UpdateCustomer from '../helper/sales/UpdateCustomer.jsx';
import BillingList from '../helper/sales/BillingList.jsx';
import CreateBilling from '../helper/sales/CreateBilling.jsx';
import UpdateBilling from '../helper/sales/UpdateBilling.jsx';
import axios from 'axios';


const SalesDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('CustomerList');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'CustomerList':
                return <CustomerList />;
            case 'CreateCustomer':
                return <CreateCustomer />;
            case 'UpdateCustomer':
                return <UpdateCustomer />;
            case 'BillingList':
                return <BillingList />;
            case 'CreateBilling':
                return <CreateBilling />;
            case 'UpdateBilling':
                return <UpdateBilling />;
            default:
                return <CustomerList />;
        }
    };

    return (
        <div >
            <h2>Sales Dashboard</h2>
            <button onClick={() => setActiveComponent('CustomerList')}>View Customers</button>
            <button onClick={() => setActiveComponent('CreateCustomer')}>Create Customer</button>
            <button onClick={() => setActiveComponent('UpdateCustomer')}>Update Customer</button>
            <button onClick={() => setActiveComponent('BillingList')}>View Billings</button>
            <button onClick={() => setActiveComponent('CreateBilling')}>Create Billing</button>
            <button onClick={() => setActiveComponent('UpdateBilling')}>Update Billing</button>
            {renderComponent()}
        </div>
    );
};

export default SalesDashboard;
