package routes

import (
	"RoleManager/controllers"
	"RoleManager/middlewares"

	"github.com/gin-gonic/gin"
)

func Router(r *gin.Engine) {
	r.Use(middlewares.AuthMiddleware())
	// Sales routes
	sales := r.Group("/sales")
	{
		// to get a single customer by id / email
		sales.GET("/customer/:id", controllers.GetCustomer)
		// to get all customers
		sales.GET("/customer", controllers.GetCustomer)

		// to create a customer
		sales.POST("/customer", controllers.CreateCustomer)

		// to update a customer
		sales.PUT("/customer/:id", controllers.UpdateCustomer)

		// to get a billing
		sales.GET("/billing/:id", controllers.GetBilling)
		// to get all billings
		sales.GET("/billing", controllers.GetBilling)

		// to create a billing
		sales.POST("/billing", controllers.CreateBilling)

		// to update a billing
		sales.PUT("/billing/:id", controllers.UpdateBilling)
	}

	accountant := r.Group("/accountant")
	{
		// to get a single billing
		accountant.GET("/billing/:id", controllers.GetBilling)
		// to get all billings
		accountant.GET("/billing", controllers.GetBilling)

		// to get a single payroll
		accountant.GET("/payroll/:id", controllers.GetPayroll)
		// 	// to get all payrolls
		accountant.GET("/payroll", controllers.GetPayroll)
	}

	hr := r.Group("hr")
	{
		// to get a single payroll
		hr.GET("/payroll/:id", controllers.GetPayroll)
		// to get all payrolls
		hr.GET("/payroll", controllers.GetPayroll)

		// to create a payroll
		hr.POST("/payroll", controllers.CreatePayroll)

		// to update a payroll
		hr.PUT("/payroll/:id", controllers.UpdatePayroll)
	}

	admin := r.Group("/admin")
	{
		// to get a user by id || email
		admin.GET("/user/:id", controllers.GetUser)
		// to get all users
		admin.GET("/user", controllers.GetUser)

		// to create a user
		admin.POST("/user", controllers.CreateUser)

		// to update a user
		admin.PUT("/user/:id", controllers.UpdateUser)
	}
}
