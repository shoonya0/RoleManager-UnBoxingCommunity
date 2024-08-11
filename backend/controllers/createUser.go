package controllers

import (
	db "RoleManager/DB"
	"RoleManager/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateUserHandler(c *gin.Context) {
	var user models.User

	// Bind the JSON body to the Credentials struct
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Add the user to the mock database
	if err := db.Database.Where("username = ?", user.UserName).First(&user).Error; err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		return
	} else {
		if err := db.Database.Create(user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
}
