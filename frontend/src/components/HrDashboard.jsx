import React, { useState } from 'react';
import CreatePayroll from '../helper/hr/CreatePayroll';
import GetPayroll from '../helper/hr/GetPayroll';
import UpdatePayroll from '../helper/hr/UpdatePayroll';

const HrDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('GetPayroll');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'CreatePayroll':
                return <CreatePayroll />;
            case 'GetPayroll':
                return <GetPayroll />;
            case 'UpdatePayroll':
                return <UpdatePayroll />;
            default:
                return <GetPayroll />;
        }
    };

    return (
        <div>
            <h2>HR Dashboard</h2>
            <button onClick={() => setActiveComponent('GetPayroll')}>View Payroll</button>
            <button onClick={() => setActiveComponent('CreatePayroll')}>Create Payroll</button>
            <button onClick={() => setActiveComponent('UpdatePayroll')}>Update Payroll</button>
            {renderComponent()}
        </div>
    );
};

export default HrDashboard;
