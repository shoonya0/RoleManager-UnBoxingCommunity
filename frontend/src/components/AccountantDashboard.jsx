import React, { useState } from 'react';
import BillingList from '../helper/accountant/GetBilling';
import GetPayroll from '../helper/accountant/GetPayroll';

const AccountantDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('GetBilling');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'GetBilling':
                return <BillingList />;
            case 'Getpayroll':
                return <GetPayroll />;
            default:
                return <BillingList />;
        }
    };

    return (
        <div>
            <h2>Accountant Dashboard</h2>
            <button onClick={() => setActiveComponent('GetBilling')}>View Billings</button>
            <button onClick={() => setActiveComponent('Getpayroll')}>View Payroll</button>
            {renderComponent()}
        </div>
    );
};

export default AccountantDashboard;
