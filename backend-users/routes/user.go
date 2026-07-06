package routes

import (
	"smarthost-users/controllers"
	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/health", func(c *fiber.Ctx) error {
		return c.SendString("Users API is up and running")
	})
	api.Post("/seed", controllers.SeedUsers)
	
	// Auth
	auth := api.Group("/auth")
	auth.Post("/register", controllers.Register)
	auth.Post("/login", controllers.Login)

	// Payments CRUD
	api.Get("/payments", controllers.GetPayments)
	api.Post("/payments", controllers.CreatePayment)
	api.Put("/payments/:id", controllers.UpdatePayment)
	api.Delete("/payments/:id", controllers.DeletePayment)
}
