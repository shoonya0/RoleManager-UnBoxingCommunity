package controllers

import (
	db "RoleManager/DB"
	"RoleManager/config"
	"RoleManager/models"
	"RoleManager/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

var secretKey = []byte(string(config.GlobalConfig.AccessTokenSecret))

func LoginHandler(ctx *gin.Context) {
	var user models.User

	if err := ctx.BindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if err := db.Database.Where("email = ? AND password = ?", user.Email, user.Password).First(&user).Error; err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	} else {
		tokenString, err := utils.CreateToken(user.UserName, user.Role, string(secretKey))
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Error generating token"})
		}
		ctx.JSON(http.StatusOK, gin.H{"token": tokenString})
		return
	}
}
