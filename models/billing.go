package models

import (
	"gorm.io/gorm"
)

type Billing struct {
	gorm.Model
	CustomerID uint    `json:"customer_id" gorm:"not null"`
	Amount     float64 `json:"amount" gorm:"not null"`
	Status     string  `json:"status" gorm:"not null"`
}
