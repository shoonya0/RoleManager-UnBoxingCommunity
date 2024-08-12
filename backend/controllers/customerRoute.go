package controllers

import (
	db "RoleManager/DB"
	"RoleManager/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCustomer(ctx *gin.Context) {
	var customer models.Customer
	var customers []models.Customer
	id := ctx.Param("id")
	email := ctx.Param("email")

	fmt.Println(id)
	fmt.Println(email)

	// Check if the database connection is available
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not found"})
		return
	}

	// Get customer by ID if provided
	if id != "" {
		if err := db.Database.Where("id = ?", id).Preload("Billings").First(&customer).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Customer record not found!"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"user": customer})
		return
	}

	// Get customer by email if provided
	if email != "" {
		if err := db.Database.Where("email = ?", email).Preload("Billings").First(&customer).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Customer record not found!"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"user": customer})
		return
	}

	// Get all customers
	if err := db.Database.Preload("Billings").Find(&customers).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving customers"})
		return
	}

	if len(customers) == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No customer records found!"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"customers": customers})
}

func CreateCustomer(ctx *gin.Context) {
	var customer models.Customer

	// Bind JSON data to the customer model
	if err := ctx.ShouldBindJSON(&customer); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "provide Json data"})
		return
	}

	// check if the database connection is available
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Database connection not found"})
		return
	}

	// Create a Customer in the database
	if err := db.Database.Create(&customer).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": err.Error()})
		return
	}

	fmt.Println(customer)
	ctx.JSON(http.StatusCreated, gin.H{"customer": customer})
}

func UpdateCustomer(ctx *gin.Context) {
	var customer models.Customer
	id := ctx.Param("id")

	// Bind JSON data to the customer model
	if err := ctx.ShouldBindJSON(&customer); err != nil {
		ctx.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	// check if the database connection is available
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Database connection not found"})
		return
	}

	// retrieve the existing customer
	var existingCustomer models.Customer
	if err := db.Database.Where("id = ?", id).Preload("Billings").First(&existingCustomer).Error; err != nil {
		ctx.JSON(http.StatusNotFound,
			gin.H{"error": "Customer record not found!"})
		return
	}

	// update the customer email
	if customer.Email != "" {
		existingCustomer.Email = customer.Email
	}

	if customer.Name != "" {
		existingCustomer.Name = customer.Name
	}

	// create an unique billing
	billingMap := make(map[uint]models.Billing)
	for _, existingBilling := range existingCustomer.Billings {
		billingMap[existingBilling.ID] = existingBilling
	}

	// Add new billings to the customer
	for _, newBilling := range customer.Billings {
		if _, exist := billingMap[newBilling.ID]; !exist {
			billingMap[newBilling.ID] = newBilling
			existingCustomer.Billings = append(existingCustomer.Billings, newBilling)
		}
	}

	// save the update
	if err := db.Database.Save(&existingCustomer).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"customer": existingCustomer})
}
