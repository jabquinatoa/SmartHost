package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"smarthost-users/models"
)

var DB *gorm.DB

func Connect() {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	// If no env vars, fallback for local run
	if host == "" {
		host = "localhost"
		user = "root"
		password = "secretpassword"
		dbname = "smarthost"
		port = "5432"
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=America/Guayaquil", host, user, password, dbname, port)
	
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}

	DB = db
	fmt.Println("Connected to Database successfully")
	
	// Migrations
	db.AutoMigrate(
		&models.User{},
		&models.PaymentMethod{},
		&models.Contact{},
		&models.Message{},
	)
}
