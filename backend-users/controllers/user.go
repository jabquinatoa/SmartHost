package controllers

import (
	"fmt"
	"smarthost-users/db"
	"smarthost-users/models"
	"github.com/gofiber/fiber/v2"
)

func SeedUsers(c *fiber.Ctx) error {
	// Delete existing
	db.DB.Exec("DELETE FROM messages")
	db.DB.Exec("DELETE FROM contacts")
	db.DB.Exec("DELETE FROM payment_methods")
	db.DB.Exec("DELETE FROM users")

	// Seed Users
	host := models.User{Nombre: "Admin Host", Email: "admin@smarthost.com", Telefono: "0999999999", Rol: "HOST"}
	guest1 := models.User{Nombre: "Juan Perez", Email: "juan@example.com", Telefono: "0991111111", Rol: "GUEST"}
	guest2 := models.User{Nombre: "Maria Lopez", Email: "maria@example.com", Telefono: "0992222222", Rol: "GUEST"}
	db.DB.Create(&host)
	db.DB.Create(&guest1)
	db.DB.Create(&guest2)

	// Seed Payment Methods
	payment1 := models.PaymentMethod{UsuarioID: host.ID, Tipo: "Tarjeta de Crédito", UltimosDigitos: "4321", Proveedor: "Visa", EsPrincipal: true}
	payment2 := models.PaymentMethod{UsuarioID: guest1.ID, Tipo: "Tarjeta de Débito", UltimosDigitos: "1111", Proveedor: "Mastercard", EsPrincipal: true}
	db.DB.Create(&payment1)
	db.DB.Create(&payment2)

	// Seed Contacts and Messages
	contact := models.Contact{HuespedID: guest1.ID, AnfitrionID: host.ID, PropiedadID: 1}
	db.DB.Create(&contact)
	msg1 := models.Message{ContactoID: contact.ID, RemitenteID: guest1.ID, Texto: "Hola, me interesa reservar."}
	msg2 := models.Message{ContactoID: contact.ID, RemitenteID: host.ID, Texto: "¡Claro! Está disponible."}
	db.DB.Create(&msg1)
	db.DB.Create(&msg2)

	// Print to console so user can see in Docker Desktop
	fmt.Printf("\n--- DATOS DE USUARIOS CREADOS ---\n")
	fmt.Printf("Anfitrion: %s (%s)\n", host.Nombre, host.Email)
	fmt.Printf("Huesped 1: %s (%s)\n", guest1.Nombre, guest1.Email)
	fmt.Printf("Huesped 2: %s (%s)\n", guest2.Nombre, guest2.Email)
	fmt.Printf("Tarjetas registradas: %d\n", 2)
	fmt.Printf("Mensajes de chat de prueba creados: %d\n", 2)
	fmt.Printf("---------------------------------\n\n")

	return c.JSON(fiber.Map{"message": "Database seeded successfully with Users, Payments and Chat!"})
}
