package models

import (
	"errors"

	"gorm.io/gorm"
)

type Payroll struct {
	gorm.Model
	EmployeeName string  `json:"employee_name" gorm:"not null"`
	Salary       float64 `json:"salary" gorm:"not null"`
	Status       string  `json:"status" gorm:"not null"`
}

// before hook
func (p *Payroll) BeforeCreate(tx *gorm.DB) (err error) {
	if p.EmployeeName == "" {
		return errors.New("employee_name is required")
	}
	if p.Salary == 0 {
		return errors.New("salary is required")
	}
	if p.Status == "" {
		return errors.New("status is required")
	}
	return
}
