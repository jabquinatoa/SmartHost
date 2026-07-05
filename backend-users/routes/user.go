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
}
