package models

import (
	"errors"

	"gorm.io/gorm"
)

type Customer struct {
	gorm.Model
	Name     string    `json:"name" gorm:"not null;default:'Xyz'"`
	Email    string    `json:"email" gorm:"unique;not null;default:'Xyz@gmail.com'"`
	Billings []Billing `json:"billings" gorm:"foreignKey:CustomerID"`
}

// BeforeCreate hook to validate fields before creating the record
func (c *Customer) BeforeCreate(tx *gorm.DB) (err error) {
	if c.Name == "" && c.Email == "" {
		return errors.New("name and email is required")
	}
	if c.Name == "" {
		return errors.New("name is required")
	}
	if c.Email == "" {
		return errors.New("email is required")
	}
	return
}

// // BeforeUpdate hook to validate fields before updating a record
// func (c *Customer) BeforeUpdate(tx *gorm.DB) (err error) {
// 	if c.Name == "" {
// 		return errors.New("name is required")
// 	}
// 	if c.Email == "" {
// 		return errors.New("email is required")
// 	}
// 	return
// }

// // AfterCreate hook to handle unique constraint violations gracefully
// func (c *Customer) AfterCreate(tx *gorm.DB) (err error) {
// 	if tx.Error != nil {
// 		if pgErr, ok := tx.Error.(*pgconn.PgError); ok && pgErr.Code == "23505" {
// 			return errors.New("email already exists")
// 		}
// 	}
// 	return
// }

// // AfterUpdate hook to handle unique constraint violations gracefully
// func (c *Customer) AfterUpdate(tx *gorm.DB) (err error) {
// 	if tx.Error != nil {
// 		if pgErr, ok := tx.Error.(*pgconn.PgError); ok && pgErr.Code == "23505" {
// 			return errors.New("email already exists")
// 		}
// 	}
// 	return
// }
