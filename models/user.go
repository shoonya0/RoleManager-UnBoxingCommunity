package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name   string `json:"name" gorm:"not null"`
	Email  string `json:"email" gorm:"unique;not null"`
	RoleID uint   `json:"role_id" gorm:"not null"`
	Role   Role   `json:"role"`
}

type Role struct {
	gorm.Model
	Name        string       `json:"name" gorm:"not null"`
	Permissions []Permission `json:"permissions" gorm:"many2many:role_permissions;"`
}

type Permission struct {
	gorm.Model
	Name string `json:"name" gorm:"not null"`
}

type RolePermission struct {
	RoleID       uint `json:"role_id"`
	PermissionID uint `json:"permission_id"`
}
