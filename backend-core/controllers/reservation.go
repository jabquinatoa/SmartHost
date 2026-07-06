package controllers

import (
	"smarthost-core/db"
	"smarthost-core/models"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

// GetReservations retrieves all reservations
func GetReservations(c *fiber.Ctx) error {
	var reservations []models.Reservation
	db.DB.Find(&reservations)
	return c.JSON(reservations)
}

// CreateReservation saves a new reservation
func CreateReservation(c *fiber.Ctx) error {
	reservation := new(models.Reservation)
	if err := c.BodyParser(reservation); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	// Simple validation
	if reservation.PropiedadID == 0 || reservation.MetodoPagoID == 0 {
		return c.Status(400).JSON(fiber.Map{"error": "Missing required fields (Property ID, Payment Method ID)"})
	}

	// Default user for demo
	if reservation.HuespedID == 0 {
		reservation.HuespedID = 1
	}

	reservation.Estado = "Confirmada"

	db.DB.Create(&reservation)
	return c.Status(201).JSON(reservation)
}

// CancelReservation cancels a reservation
func CancelReservation(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	var reservation models.Reservation
	if err := db.DB.First(&reservation, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Reservation not found"})
	}

	now := time.Now()
	reservation.Estado = "Cancelada"
	reservation.FechaCancelacion = &now

	db.DB.Save(&reservation)
	return c.JSON(reservation)
}
