package main

import (
	"flag"
	"log"

	"github.com/gin-gonic/gin"
)

var (
	port string
)

func init() {
	flag.StringVar(&port, "poet", "3230", "Port to run the server on")
}

func main() {
	r := gin.Default()

	// port := os.Getenv("PORT")
	// if port == "" {
	// port = "3230"
	// }

	if err := r.Run(": " + port); err != nil {
		log.Fatalf("\n \nError while running the server -> %v", err)
	}

}
