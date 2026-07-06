package controllers

import (
	"smarthost-users/db"
	"smarthost-users/models"
	"smarthost-users/middleware"
	"time"
	
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type RegisterInput struct {
	Nombre   string `json:"nombre"`
	Email    string `json:"email"`
	Telefono string `json:"telefono"`
	Password string `json:"password"`
}

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Register(c *fiber.Ctx) error {
	var input RegisterInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input format"})
	}

	if input.Email == "" || input.Password == "" || input.Nombre == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Missing required fields"})
	}

	var count int64
	db.DB.Model(&models.User{}).Where("email = ?", input.Email).Count(&count)
	if count > 0 {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "Email already in use"})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to hash password"})
	}

	user := models.User{
		Nombre:       input.Nombre,
		Email:        input.Email,
		Telefono:     input.Telefono,
		PasswordHash: string(hashedPassword),
		Rol:          "GUEST", // Default role
	}

	if err := db.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create user"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User registered successfully",
		"user": fiber.Map{
			"id":     user.ID,
			"nombre": user.Nombre,
			"email":  user.Email,
			"rol":    user.Rol,
		},
	})
}

func Login(c *fiber.Ctx) error {
	var input LoginInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid input format"})
	}

	var user models.User
	if err := db.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"rol":     user.Rol,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	t, err := token.SignedString(middleware.JwtSecret)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error generating token"})
	}

	return c.JSON(fiber.Map{
		"message": "Login successful",
		"token":   t,
		"user": fiber.Map{
			"id":     user.ID,
			"nombre": user.Nombre,
			"email":  user.Email,
			"rol":    user.Rol,
		},
	})
}
