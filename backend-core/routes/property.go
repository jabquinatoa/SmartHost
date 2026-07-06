package routes

import (
	"smarthost-core/controllers"

	"github.com/gofiber/fiber/v2"
)

func PropertyRoutes(app *fiber.App) {
	api := app.Group("/api")
	
	api.Get("/properties", controllers.GetProperties)
	api.Post("/seed", controllers.SeedProperties)

	// Reviews
	api.Post("/properties/:id/reviews", controllers.CreateReview)
	api.Get("/properties/:id/reviews", controllers.GetReviewsByProperty)
	api.Get("/reviews", controllers.GetAllReviews)
}
