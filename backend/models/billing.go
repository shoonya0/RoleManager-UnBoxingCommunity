package models

import (
	"errors"

	"gorm.io/gorm"
)

type Billing struct {
	gorm.Model
	CustomerID uint    `json:"customer_id" gorm:"not null"`
	Amount     float64 `json:"amount" gorm:"not null"`
	Status     string  `json:"status" gorm:"not null"`
}

func (b *Billing) BeforeCreate(tx *gorm.DB) (err error) {
	if b.CustomerID == 0 {
		return errors.New("customer_id is required")
	}
	if b.Amount == 0 {
		return errors.New("amount is required")
	}
	if b.Status == "" {
		return errors.New("status is required")
	}
	return
}
