package routes

import (
	"smarthost-core/controllers"

	"github.com/gofiber/fiber/v2"
)

func ReservationRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/reservations", controllers.GetReservations)
	api.Post("/reservations", controllers.CreateReservation)
	api.Post("/reservations/:id/cancel", controllers.CancelReservation)
}
