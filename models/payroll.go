package models

import (
	"gorm.io/gorm"
)

type Payroll struct {
	gorm.Model
	EmployeeName string  `json:"employee_name" gorm:"not null"`
	Salary       float64 `json:"salary" gorm:"not null"`
	Status       string  `json:"status" gorm:"not null"`
}
