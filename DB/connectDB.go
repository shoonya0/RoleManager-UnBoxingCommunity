package db

import (
	"RoleManager/config"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq" // Import the PostgreSQL driver
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func dBConnect() (*gorm.DB, error) {
	dns := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		config.GlobalConfig.DBHost,
		config.GlobalConfig.DBPort,
		config.GlobalConfig.DBUser,
		config.GlobalConfig.DBPass,
		config.GlobalConfig.DBName)

	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}

	// ping to the DB for checking the connection
	if err := sqlDB.Ping(); err != nil {
		return nil, err
	}

	// Configure connection pooling
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	// No connection lifetime limit
	sqlDB.SetConnMaxLifetime(0)

	fmt.Println("Successfully connected to the database")

	return db, nil
}

func DBMiddleware() gin.HandlerFunc {
	db, err := dBConnect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	return func(ctx *gin.Context) {
		ctx.Set("db", db)
		ctx.Next()
	}
}

// insertStmt := `insert into "Employee" ("Name", "EmpId") values('abcd', '41')`
// _, e := db.Exec(insertStmt)
// checkError(e)

// insertDynStmt := `insert into "Employee" ("Name", "EmpId") values($1, $2)`
// _, e = db.Exec(insertDynStmt, "efgh", "42")
// checkError(e)
