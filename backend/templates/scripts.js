// scripts.js

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // payload request
    const payload = {
        username: username,
        password: password
    };

    let userRole = '';

    // send the payload to the backend server
    fetch('http://localhost:3231/login', { // Ensure this points to your backend server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                const tokenPayload = JSON.parse(atob(data.token.split('.')[1]));
                userRole = tokenPayload.role;
                setRole(userRole, username);
            } else {
                alert('Invalid credentials!');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login.');
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setRole(role, username) {
    document.getElementById('authentication').style.display = 'none';
    document.getElementById('authorization').style.display = 'block';
    document.getElementById('name').innerText = capitalizeFirstLetter(username);
    document.getElementById('user-role').innerText = capitalizeFirstLetter(role);
    document.getElementById('user-role').style.display = 'block';

    // Display relevant management options based on role
    switch (role) {
        case 'sales':
            showSection('customer-management');
            break;
        case 'accountant':
            showSection('billing-management');
            break;
        case 'hr':
            showSection('payroll-management');
            break;
        case 'admin':
            showSection('user-management');
            showSection('customer-management');
            break;
    }
}

function showSection(id) {
    document.getElementById(id).style.display = 'block';
}

function performAction(section, action) {
    alert(`Performing ${action} action on ${section}`);
    if (action === 'read') {
        alert('Reading data');
        fetch.


    } else if (action === 'write') {
        alert('Creating new data');

    } else if (action === 'update') {
        alert('Updating data');

    }
}
