package routes

import (
	"RoleManager/controllers"
	"RoleManager/middlewares"

	"github.com/gin-gonic/gin"
)

func Router(r *gin.Engine) {
	r.Use(middlewares.AuthMiddleware)

	// Sales routes
	sales := r.Group("/sales")
	// role based accesses
	sales.Use(middlewares.RoleBasedAuth("sales"))
	{
		// to get a single customer by id
		sales.GET("/customer/:id", controllers.GetCustomer)
		// to get all customers or a single customer by email which is provided in JSON body
		sales.GET("/customers", controllers.GetCustomer)

		// to create a customer
		sales.POST("/customer", controllers.CreateCustomer)

		// to update a customer
		sales.PUT("/customer/:id", controllers.UpdateCustomer)

		// to get a billing
		sales.GET("/billing/:id", controllers.GetBilling)
		// to get all billings or a single billing by customer_id which is provided in JSON body
		sales.GET("/billings", controllers.GetBilling)

		// to create a billing
		sales.POST("/billing", controllers.CreateBilling)

		// to update a billing
		sales.PUT("/billing/:id", controllers.UpdateBilling)
	}

	accountant := r.Group("/accountant")
	accountant.Use(middlewares.RoleBasedAuth("accountant"))
	{
		// to get a single billing
		accountant.GET("/billing/:id", controllers.GetBilling)
		// to get all billings or a single billing by customer_id which is provided in JSON body
		accountant.GET("/billings", controllers.GetBilling)

		// to get a single payroll
		accountant.GET("/payroll/:id", controllers.GetPayroll)
		// 	// to get all payrolls
		accountant.GET("/payrolls", controllers.GetPayroll)
	}

	hr := r.Group("hr")
	hr.Use(middlewares.RoleBasedAuth("hr"))
	{
		// to get a single payroll
		hr.GET("/payroll/:id", controllers.GetPayroll)
		// to get all payrolls or a single payroll by employee_name which is provided in JSON body
		hr.GET("/payrolls", controllers.GetPayroll)

		// to create a payroll
		hr.POST("/payroll", controllers.CreatePayroll)

		// to update a payroll
		hr.PUT("/payroll/:id", controllers.UpdatePayroll)
	}

	admin := r.Group("/admin")
	admin.Use(middlewares.RoleBasedAuth("admin"))
	{
		// to get a user by id || email
		admin.GET("/user/:id", controllers.GetUser)
		// to get all users
		admin.GET("/users", controllers.GetUser)

		// to create a user
		admin.POST("/createUser", controllers.CreateUser)

		// to update a user
		admin.PUT("/user/:id", controllers.UpdateUser)
	}
}
