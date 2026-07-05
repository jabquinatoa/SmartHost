package controllers

import (
	"fmt"
	"smarthost-core/db"
	"smarthost-core/models"
	"time"

	"github.com/gofiber/fiber/v2"
)

// GetReservations devuelve las reservas. 
// Para el mock de usuario, podemos pasar el huesped_id como query param o asumir 1.
func GetReservations(c *fiber.Ctx) error {
	var reservas []models.Reservation
	db.DB.Find(&reservas)
	return c.JSON(reservas)
}

func CreateReservation(c *fiber.Ctx) error {
	var reserva models.Reservation
	if err := c.BodyParser(&reserva); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Por defecto estado pendiente
	if reserva.Estado == "" {
		reserva.Estado = "Pendiente"
	}

	if err := db.DB.Create(&reserva).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "No se pudo crear la reserva"})
	}

	return c.JSON(reserva)
}

func CancelReservation(c *fiber.Ctx) error {
	id := c.Params("id")
	var reserva models.Reservation

	if err := db.DB.First(&reserva, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Reserva no encontrada"})
	}

	if reserva.Estado == "Cancelada" || reserva.Estado == "Check-out" {
		return c.Status(400).JSON(fiber.Map{"error": "Esta reserva ya fue procesada o cancelada"})
	}

	// Regla de las 24 horas
	now := time.Now()
	hoursPassed := now.Sub(reserva.CreatedAt).Hours()
	
	var refundAmount float64
	var penalty bool
	var message string

	if hoursPassed <= 24 {
		refundAmount = reserva.PrecioTotal
		penalty = false
		message = fmt.Sprintf("Cancelación gratuita. Reembolso total procesado: $%.2f", refundAmount)
	} else {
		refundAmount = 0 // 100% penalidad
		penalty = true
		message = "Cancelación procesada con penalidad total (han pasado más de 24 horas)."
	}

	// Actualizar reserva
	reserva.Estado = "Cancelada"
	reserva.FechaCancelacion = &now
	reserva.RazonCancelacion = "Cancelada por el huésped"

	db.DB.Save(&reserva)

	return c.JSON(fiber.Map{
		"message": message,
		"refundAmount": refundAmount,
		"penaltyApplied": penalty,
		"hoursPassed": hoursPassed,
		"reserva": reserva,
	})
}
