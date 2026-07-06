package controllers

import (
	"smarthost-users/db"
	"smarthost-users/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// GetPayments retrieves all payment methods (for the demo, we fetch all. In a real app, filter by UserID)
func GetPayments(c *fiber.Ctx) error {
	var payments []models.PaymentMethod
	db.DB.Find(&payments)
	return c.JSON(payments)
}

// CreatePayment creates a new payment method
func CreatePayment(c *fiber.Ctx) error {
	payment := new(models.PaymentMethod)
	if err := c.BodyParser(payment); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body: " + err.Error()})
	}

	// For the demo, default to UserID 1 if not provided
	if payment.UsuarioID == 0 {
		payment.UsuarioID = 1
	}

	db.DB.Create(&payment)
	return c.Status(201).JSON(payment)
}

// UpdatePayment modifies an existing payment method
func UpdatePayment(c *fiber.Ctx) error {
	id := c.Params("id")
	var payment models.PaymentMethod
	
	if err := db.DB.First(&payment, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Payment method not found"})
	}

	// Keep the original ID
	originalID := payment.ID

	if err := c.BodyParser(&payment); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body: " + err.Error()})
	}

	payment.ID = originalID

	db.DB.Save(&payment)
	return c.JSON(payment)
}

// DeletePayment removes a payment method
func DeletePayment(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	db.DB.Delete(&models.PaymentMethod{}, id)
	return c.JSON(fiber.Map{"message": "Payment method deleted successfully"})
}
