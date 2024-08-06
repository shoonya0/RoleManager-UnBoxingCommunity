package controllers

import (
	db "RoleManager/DB"
	"RoleManager/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetBilling(ctx *gin.Context) {
	var billing models.Billing
	var billings []models.Billing
	id := ctx.Param("id")

	// checking Database connection
	if db.Database == nil {
		ctx.JSON(500, gin.H{"error": "Database connection not found"})
		return
	}

	// checking if the id is provided to querry the database
	if id != "" {
		if err := db.Database.Where("id = ?", id).First(&billing).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Billing record not found!"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"billing": billing})
		return
	}

	// request to get a billing by customerID from JSON body
	var requestBody map[string]interface{}
	if err := ctx.ShouldBindJSON(&requestBody); err == nil {
		if customerID, ok := requestBody["customer_id"].(float64); ok {
			customerIDUint := uint(customerID)
			if err := db.Database.Where("customer_id = ?", customerIDUint).First(&billing).Error; err != nil {
				ctx.JSON(http.StatusNotFound, gin.H{"error": "billing record not found"})
				return
			}
			ctx.JSON(http.StatusOK, gin.H{"billing": billing})
			return
		}
	}

	if err := db.Database.Find(&billings).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving billings"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"billings": billings})
}

func CreateBilling(ctx *gin.Context) {
	var billing models.Billing

	// Bind JSON to billing model
	if err := ctx.ShouldBindJSON(&billing); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// check if the database connection is available
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Database connection not found"})
		return
	}

	// creating the billing
	if err := db.Database.Create(&billing).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating billing"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"billing": billing})
}

func UpdateBilling(ctx *gin.Context) {
	var billing models.Billing
	id := ctx.Param("id")

	// Bind JSON to billing model
	if err := ctx.ShouldBindJSON(&billing); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the database connection is available
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not found"})
		return
	}

	// Retrieve the existing billing
	var existingBilling models.Billing
	if err := db.Database.Where("id = ?", id).First(&existingBilling).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Billing record not found!"})
		return
	}

	// Update the billing fields
	if billing.Amount != 0 {
		existingBilling.Amount = billing.Amount
	}
	if billing.Status != "" {
		existingBilling.Status = billing.Status
	}

	// Save the updated billing
	if err := db.Database.Save(&existingBilling).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating billing"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"billing": existingBilling})
}
