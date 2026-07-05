package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"smarthost-core/db"
	"smarthost-core/routes"
)

func main() {
	// Connect to Database
	db.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/api/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok", "message": "SmartHost API is running"})
	})

	// Register Routes
	routes.PropertyRoutes(app)
	routes.ReservationRoutes(app)

	log.Fatal(app.Listen(":3002"))
}
