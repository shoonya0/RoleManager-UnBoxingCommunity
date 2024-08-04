package db

import (
	"RoleManager/config"
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq" // Import the PostgreSQL driver
)

func dBConnect() (*sql.DB, error) {
	psqlConn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		config.GlobalConfig.DBHost,
		config.GlobalConfig.DBPort,
		config.GlobalConfig.DBUser,
		config.GlobalConfig.DBPass,
		config.GlobalConfig.DBName)

	db, err := sql.Open("postgres", psqlConn)
	if err != nil {
		return nil, err
	}

	// ping to the DB for checking the connection
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	fmt.Println("Successfully connected to the database")

	return db, nil
}

func DBMiddleware() gin.HandlerFunc {
	db, err := dBConnect()
	if err != nil {
		panic(err)
	}
	return func(ctx *gin.Context) {
		ctx.Set("db", db)
		ctx.Next()
	}
}
