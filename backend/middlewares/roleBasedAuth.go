package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RoleBasedAuth(role string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// convert the interface to string
		userRole := ctx.GetString("role")

		// check if the user role is in the roles slice
		if userRole != role {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			ctx.Abort()
			return
		}
		ctx.Next()
	}
}
