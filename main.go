package main

import (
	db "RoleManager/DB"
	"RoleManager/config"
	"RoleManager/controllers"
	"RoleManager/routes"
	"log"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq" // Import the PostgreSQL driver
	"github.com/spf13/viper"
)

type Env struct {
	PORT  string `mapstructure:"PORT"`
	DEBUG bool   `mapstructure:"DEBUG"`
	MODE  string `mapstructure:"MODE"`
}

var (
	env  Env
	mode string
	port string
)

func init() {
	viper.AddConfigPath(".")
	viper.SetConfigName("config")
	viper.SetConfigType("env")
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %v", err)
	}

	if err := viper.Unmarshal(&env); err != nil {
		log.Fatalf("Error unmarshaling config: %v", err)
	}

	if env.MODE == "production" {
		log.Println("Logger disabled")
		gin.SetMode(gin.ReleaseMode)
		mode = "config.prod"
	} else if env.MODE == "testing" {
		log.Println("Logger enabled")
		gin.SetMode(gin.DebugMode)
		mode = "config.test"
	} else {
		log.Println("Logger enabled")
		gin.SetMode(gin.DebugMode)
		mode = "config.dev"
	}

	err := config.LoadConfig("./config/envConfig", mode)
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
}

func main() {
	r := gin.Default()

	// Middleware for connecting to the database
	db.DBConnect()

	// Routes
	routes.Router(r)
	r.POST("/login", controllers.LoginHandler)
	// r.POST("/createUser", controllers.CreateUserHandler)

	port = env.PORT
	if port == "" {
		port = "3230"
	}
	if err := r.Run(": " + port); err != nil {
		log.Fatalf("\n \nError while running the server -> %v", err)
	}
}
