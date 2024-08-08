package models

import (
	"errors"

	"gorm.io/gorm"
)

// User represents a user in the system
type User struct {
	gorm.Model
	Name     string `json:"name" gorm:"not null"`
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"-" gorm:"not null"`
	Role     string `json:"role" gorm:"not null"`
}

// beforeCreate hook to validate fields before creating the record
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.Name == "" {
		return errors.New("name is required")
	}
	if u.Email == "" {
		return errors.New("email is required")
	}
	if u.Password == "" {
		return errors.New("password is required")
	}
	if u.Role == "" {
		return errors.New("role is required")
	}
	return
}
