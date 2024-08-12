package controllers

import (
	db "RoleManager/DB"
	"RoleManager/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUser(ctx *gin.Context) {
	var user models.User
	var users []models.User
	var id = ctx.Param("id")
	var email = ctx.Param("email")

	// check the database conn.
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Database connection not found"})
		return
	}

	// check if id is provided in param
	if id != "" {
		if err := db.Database.Where("id = ?", id).First(&user).Error; err != nil {
			ctx.JSON(http.StatusNotFound,
				gin.H{"error": "user record not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"user": user})
		return
	}

	if email != "" {
		if err := db.Database.Where("email = ?", email).First(&user).Error; err != nil {
			ctx.JSON(http.StatusNotFound,
				gin.H{"error": "user record not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"user": user})
		return
	}

	// if id || email is not provided
	if err := db.Database.Find(&users).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Error retrieving users"})
		return
	}

	if len(users) == 0 {
		ctx.JSON(http.StatusNotFound,
			gin.H{"error": "No user record found!"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"users": users})
}

func CreateUser(ctx *gin.Context) {
	var user models.User

	// Bind JSON to user model
	if err := ctx.BindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if user.Role == "admin" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if user.Role != "hr" && user.Role != "accountant" && user.Role != "sales" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid role provided"})
		return
	}

	// check if the database connection is available
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not found"})
		return
	}

	// creating the user
	if err := db.Database.Where("user_name = ?", user.UserName).First(&user).Error; err != nil {
		if err.Error() == "record not found" {
			if err := db.Database.Create(&user).Error; err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			ctx.JSON(http.StatusCreated, gin.H{"user": "User created successfully"})
			return
		}
		return
	} else {
		ctx.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		return
	}
}

func UpdateUser(ctx *gin.Context) {
	var user models.User
	id := ctx.Param("id")

	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest,
			gin.H{"error": "please provide valid JSON data"})
		return
	}

	// checking the DB con.
	if db.Database == nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Database connection not found"})
		return
	}

	// retrive existing user
	var existingUser models.User
	if err := db.Database.Where("id = ?", id).First(&existingUser).Error; err != nil {
		ctx.JSON(http.StatusNotFound,
			gin.H{"error": "User record not found!"})
		return
	}

	// updte the payroll
	if user.Email != "" {
		existingUser.Email = user.Email
	}
	if user.UserName != "" {
		existingUser.UserName = user.UserName
	}
	if user.Role != "" {
		existingUser.Role = user.Role
	}
	if user.Password != "" {
		existingUser.Password = user.Password
	}

	if err := db.Database.Save(&existingUser).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError,
			gin.H{"error": "Error updating user"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"user": existingUser})
}
