package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
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
		dbname = "smarthost_users"
		port = "3306"
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, password, host, port, dbname)
	
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
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
