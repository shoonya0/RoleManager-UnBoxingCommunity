package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

func CreateToken(username, authType, secretKey string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": username,
			"role":     authType,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	// Convert secretKey to byte slice
	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
