package middlewares

import (
	"RoleManager/config"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

type Claims struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

var secretKey = []byte(string(config.GlobalConfig.AccessTokenSecret))

func AuthMiddleware(ctx *gin.Context) {
	if ctx.Request.URL.Path == "/login" {
		ctx.Next()
		return
	}

	// jwt token fetching
	authHeader := ctx.Request.Header.Get("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Missing Authorization header"})
		ctx.Abort()
		return
	}

	tokenString := strings.TrimPrefix(authHeader, "Bearer ")

	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil || !token.Valid {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		ctx.Abort()
		return
	}

	// Store user info in context
	ctx.Set("user", claims.Username)
	ctx.Set("role", claims.Role)

	ctx.Next()
}
