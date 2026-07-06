package controllers

import (
	"strconv"
	"smarthost-core/db"
	"smarthost-core/models"
	"time"

	"github.com/gofiber/fiber/v2"
)

// CreateReview creates a new review for a property
func CreateReview(c *fiber.Ctx) error {
	propertyID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid property ID"})
	}

	review := new(models.Review)
	if err := c.BodyParser(review); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body: " + err.Error()})
	}

	review.PropertyID = uint(propertyID)
	// Set current date if missing
	if review.Date == "" {
		review.Date = time.Now().Format("2006-01-02")
	}

	db.DB.Create(&review)
	return c.Status(201).JSON(review)
}

// GetReviewsByProperty returns all reviews for a given property
func GetReviewsByProperty(c *fiber.Ctx) error {
	propertyID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid property ID"})
	}

	var reviews []models.Review
	db.DB.Where("property_id = ?", propertyID).Order("created_at desc").Find(&reviews)

	return c.JSON(reviews)
}

// GetAllReviews returns all reviews across all properties
func GetAllReviews(c *fiber.Ctx) error {
	var reviews []models.Review
	db.DB.Order("created_at desc").Find(&reviews)
	return c.JSON(reviews)
}
