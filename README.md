# RoleManager Backend

This repository contains the backend implementation for the RoleManager system, built with Go, Gin, and GORM. The application provides role-based access control and handles various operations such as user management, payroll processing, customer management, and billing.

## Project Structure

```plaintext
├── config/
│   ├── envConfig/
│   │   ├── config.dev.env
│   │   ├── config.prod.env
│   │   ├── config.test.env
│   └── config.go
├── controllers/
│   ├── billingRoute.go
│   ├── createUser.go
│   ├── customerRoute.go
│   ├── login.go
│   ├── payrollRoute.go
│   └── userRoute.go
├── DB/
│   └── connectDB.go
├── middlewares/
│   ├── authMiddleware.go
│   ├── crossOriginRequest.go
│   └── roleBasedAuth.go
├── models/
│   ├── billing.go
│   ├── customer.go
│   ├── payroll.go
│   └── user.go
├── routes/
│   └── routes.go
├── tmp/
├── utils/
│   └── createToken.go
├── .gitignore
├── config.env
├── go.mod
├── go.sum
├── main.go
├── MVC-Architecture.png
├── project.png
├── projectStructure.txt
└── README.md
```

## Prerequisites

Ensure you have the following tools installed:

- [Go (v1.16 or later)](https://go.dev/doc/install)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/downloads)

## Getting Started

### Installation

Clone the Repository

```bash
git clone https://github.com/shoonya0/RoleManager-UnBoxingCommunity/tree/main
cd backend
```

### Setup Environment Variables

The path to environment configuration file and adjust the settings as needed:

```
config.env
config/envConfig/config.dev.env
config/envConfig/config.prod.env
config/envConfig/config.test.env
```

Update the environment variables in config.dev.env to match your local setup.

### Install Dependencies

```
go mod tidy
```

### Database Migration

Ensure PostgreSQL is running and the connection details in your environment file are correct. Then run:

```
go run main.go
```

This will automatically migrate your database models but you have to make an database first in your PostgreSQL.

Note := The credentials of the database will be same as given in the DB_NAME ,DB_USER and DB_USER.

### Running the Application

You can start the server using the following command:

```
go run main.go
```

Note := You can also install air Live reload for Go apps

- [air](https://github.com/air-verse/air)

The server will run on the port specified in your environment file. By default, it listens on port 3230.

## API Reference

#### Authentication

```
POST /login : Authenticates the user and returns a JWT token.
```

Authenticates the user and returns a JWT token.

| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. correct user name |
| `password` | `string` | **Required**. correct password  |

Note :- Bearer token needed for authorization in all routes except login.

#### Sales Routes

```
GET Routes : Get a customer or all customer
```

| Route                        | Parameter     | Type     | Description                                 |
| :--------------------------- | :------------ | :------- | :------------------------------------------ |
| /sales/customer/:id          | `id`          | `unit`   | **Required**. Id of customer to fetch       |
| /sales/customers/:email      | `email`       | `string` | **Required**. email of customer to fetch    |
| /sales/customers             | `---`         | `---`    | `---`                                       |
| /sales/billing/:id           | `id`          | `uint`   | **Required**. ID of the billing to fetch    |
| /sales/billings/:customer_id | `customer_id` | `uint`   | **Required**. Customer ID to fetch billings |
| /sales/billings              | `---`         | `---`    | `---`                                       |

```
POST Route : Create a new customer and billing
```

| Route           | Parameter                         | Type     | Description                                        |
| :-------------- | :-------------------------------- | :------- | :------------------------------------------------- |
| /sales/customer | `name , email and billing`        | `string` | **Required**. name and email of the customer       |
| /sales/billing  | `customer_id , salary and status` | `string` | **Required**. customer_id and salary of the status |

```
PUT Route : Update an existing customer and billing
```

| Route               | Parameter                  | Type     | Description                                                                       |
| :------------------ | :------------------------- | :------- | :-------------------------------------------------------------------------------- |
| /sales/customer/:id | `name , email and billing` | `string` | **Required**. Id of customer along with name ,email ,billing and update           |
| /sales/billing/:id  | `name , email and billing` | `string` | **Required**. Id of billing long with the updated customer_id, salary, and status |

#### Accountant Routes

Get a Billing

```
GET Route : Retrieve billing or payroll information
```

| Route                             | Parameter     | Type   | Description                                 |
| :-------------------------------- | :------------ | :----- | :------------------------------------------ |
| /accountant/billing/:id           | `id`          | `uint` | **Required**. ID of the billing to fetch    |
| /accountant/billings/:customer_id | `customer_id` | `uint` | **Required**. Customer ID to fetch billings |
| /accountant/billings              | `---`         | `---`  | `---`                                       |
| /accountant/payroll/:id           | `id`          | `uint` | **Required**. ID of the payroll to fetch    |
| /accountant/payrolls              | `---`         | `---`  | `---`                                       |

#### HR Routes

Get Routes: Retrieve payroll information

```
GET Route : Retrieve payroll information
```

| Route        | Parameter | Type   | Description                          |
| :----------- | :-------- | :----- | :----------------------------------- |
| /hr/payroll/ | `id`      | `uint` | Required. ID of the payroll to fetch |
| /hr/payrolls | `---`     | `---`  | `---`                                |

```
POST Route : Create a new payroll record
```

| Route       | Parameter                       | Type                      | Description                                     |
| :---------- | :------------------------------ | :------------------------ | :---------------------------------------------- |
| /hr/payroll | `employee_name, salary, status` | `string, float64, string` | **Required**. Employee name, salary, and status |

```
PUT Route : Update an existing payroll record
```

| Route       | Parameter                           | Type                            | Description                                                                                         |
| :---------- | :---------------------------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------- |
| /hr/payroll | `id, employee_name, salary, status` | `uint, string, float64, string` | **Required**. ID of the payroll to update, along with the updated employee name, salary, and status |

#### admin Routes

Get Routes: Retrieve payroll information

```
GET Routes : Retrieve user information
```

| Route               | Parameter | Type     | Description                             |
| :------------------ | :-------- | :------- | :-------------------------------------- |
| /admin/user/        | `id`      | `uint`   | Required. ID of the payroll to fetch    |
| /admin/users/:email | `email`   | `string` | Required. email of the payroll to fetch |
| /admin/users        | `---`     | `---`    | `---`                                   |

```
POST Route : Create a new user
```

| Route             | Parameter                         | Type                             | Description                                                             |
| :---------------- | :-------------------------------- | :------------------------------- | :---------------------------------------------------------------------- |
| /admin/createUser | `username, email, password, role` | `string, string, string, string` | **Required**. Username, email, password, and role of the user to create |

```
PUT Route : Update an existing user
```

| Route        | Parameter                             | Type                                   | Description                                                                                        |
| :----------- | :------------------------------------ | :------------------------------------- | :------------------------------------------------------------------------------------------------- |
| /admin/user/ | `id, username, email, password, role` | `uint, string, string, string, string` | **Required**. ID of the user to update, along with the updated username, email, password, and role |

### For frontend

1. Go to the frontend :
   - execute `npm install` to install all dependency.
   - execute `npm run dev`
2. `npm run dev` and play with the local dev environment.
3. `npm run build`.
4. `npm run ssr`. You can [disable javascript in your browser](https://developer.chrome.com/docs/devtools/javascript/disable/), to verify if it can still render.

## Features

**Role-Based Access Control:** Manage access based on user roles (Admin, HR, Sales, Accountant).

**JWT Authentication:** Secure endpoints with JWT tokens.

**Modular Design:** Easily extend and maintain with a clear folder structure.

## Diagrams

MVC Architecture:

Project Structure:

## Contributing

Please open issues or submit pull requests with
any changes or improvements.

## Contact

For further information, you can contact the project maintainers.
