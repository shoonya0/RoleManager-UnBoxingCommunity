package db

import (
	"RoleManager/config"
	"RoleManager/models"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// make an globle variable for the database connection
var Database *gorm.DB = nil

func DBConnect() {
	dns := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		config.GlobalConfig.DBHost,
		config.GlobalConfig.DBPort,
		config.GlobalConfig.DBUser,
		config.GlobalConfig.DBPass,
		config.GlobalConfig.DBName)

	var err error

	// Enable the logger
	// Database, err = gorm.Open(postgres.Open(dns), &gorm.Config{})

	// Disable the logger
	Database, err = gorm.Open(postgres.Open(dns), &gorm.Config{Logger: logger.Default.LogMode(logger.Silent)})

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
		return
	}

	sqlDB, err := Database.DB()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
		return
	}

	// ping to the DB for checking the connection
	if err := sqlDB.Ping(); err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
		return
	}

	// Configure connection pooling
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	// No connection lifetime limit
	sqlDB.SetConnMaxLifetime(0)

	err = Database.AutoMigrate(&models.Customer{}, &models.Billing{}, &models.Payroll{}, &models.User{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
		return
	}

	fmt.Println("Successfully connected to the database ")
}
