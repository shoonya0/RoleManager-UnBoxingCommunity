package controllers

import (
	db "RoleManager/DB"
	"RoleManager/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetPayroll(ctx *gin.Context) {
	var payroll models.Payroll
	var payrolls []models.Payroll
	id := ctx.Param("id")

	// check the db con
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Database connection not found"})
		return
	}

	// check is id is provided in prame
	if id != "" {
		if err := db.Database.Where("id = ?", id).First(&payroll).Error; err != nil {
			ctx.JSON(http.StatusNotFound,
				gin.H{"error": "Payroll record not found!"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"payroll": payroll})
	}

	// request to get a payroll by employeeName from JSON body
	var requestBody map[string]interface{}
	if err := ctx.ShouldBindJSON(&requestBody); err == nil {
		if employeeName, ok := requestBody["employee_name"].(string); ok && employeeName != "" {
			if err := db.Database.Where("employee_name = ?", employeeName).First(&payroll).Error; err != nil {
				ctx.JSON(http.StatusNotFound,
					gin.H{"error": "Payroll record not found"})
				return
			}
			ctx.JSON(http.StatusOK, gin.H{"payroll": payroll})
			return
		}
	}

	if err := db.Database.Find(&payrolls).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Error retrieving payrolls"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"payrolls": payrolls})
}

func CreatePayroll(ctx *gin.Context) {
	var payroll models.Payroll

	// Bind the JSON to payroll
	if err := ctx.ShouldBindJSON(&payroll); err != nil {
		ctx.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	// checking the DB con.
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Database connection not found"})
		return
	}

	// create payroll in the database
	if err := db.Database.Create(&payroll).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Error creating payroll"})
		return
	}

	ctx.JSON(http.StatusInternalServerError,
		gin.H{"payroll": payroll})
}

func UpdatePayroll(ctx *gin.Context) {
	var payroll models.Payroll
	id := ctx.Param("id")

	if err := ctx.ShouldBindJSON(&payroll); err != nil {
		ctx.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	// checking the DB con.
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Database connection not found"})
		return
	}

	// retrive existing payroll
	var existingPayroll models.Payroll
	if err := db.Database.Where("id = ?", id).First(&existingPayroll).Error; err != nil {
		ctx.JSON(http.StatusNotFound,
			gin.H{"error": "Payroll record not found!"})
		return
	}

	// updte the payroll
	if payroll.EmployeeName != "" {
		existingPayroll.EmployeeName = payroll.EmployeeName
	}
	if payroll.Salary != 0 {
		existingPayroll.Salary = payroll.Salary
	}
	if payroll.Status != "" {
		existingPayroll.Status = payroll.Status
	}

	if err := db.Database.Save(&existingPayroll).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Error updating payroll"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"payroll": existingPayroll})
}
