package controllers

import (
	"smarthost-backend/db"
	"smarthost-backend/models"

	"github.com/gofiber/fiber/v2"
)

func GetProperties(c *fiber.Ctx) error {
	var properties []models.Property
	
	// Fetch all properties from the database
	result := db.DB.Find(&properties)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
	}
	
	return c.JSON(properties)
}

func SeedProperties(c *fiber.Ctx) error {
	// Static data from Angular frontend
	properties := []models.Property{
		{
			Name: "Loft Moderno Parque La Carolina", Location: "La Carolina, Quito Norte", Price: 65, Rating: 4.9, Reviews: 128, Type: "Lofts", Capacity: 4, Image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=800&fit=crop",
			Images: []string{"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"},
			Amenities: []string{"WiFi", "Cocina", "TV", "Estacionamiento"}, Description: "Hermoso loft completamente amueblado a pasos del Parque La Carolina...", Estado: "Libre",
		},
		{
			Name: "Casa Patrimonial Restaurada", Location: "Centro Histórico, Quito Centro", Price: 85, Rating: 4.8, Reviews: 89, Type: "Casas", Capacity: 6, Image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=800&fit=crop",
			Images: []string{"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop"},
			Amenities: []string{"WiFi", "Cocina", "Mascotas"}, Description: "Sumérgete en la magia y la historia del Primer Patrimonio Cultural de la Humanidad alojándote en esta auténtica joya arquitectónica colonial.", Estado: "Ocupado",
		},
		{
			Name: "Suite Ejecutiva frente al CCI", Location: "La Carolina, Quito Norte", Price: 90, Rating: 5.0, Reviews: 64, Type: "Suites", Capacity: 2, Image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=800&fit=crop",
			Images: []string{"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop"},
			Amenities: []string{"WiFi", "TV", "Estacionamiento", "Jacuzzi"}, Description: "Suite de lujo con acabados de primera calidad, ideal para ejecutivos.", Estado: "Mantenimiento",
		},
		{
			Name: "Departamento Moderno El Recreo", Location: "El Recreo, Quito Sur", Price: 55, Rating: 4.7, Reviews: 42, Type: "Departamentos", Capacity: 4, Image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=800&fit=crop",
			Images: []string{"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"},
			Amenities: []string{"WiFi", "TV", "Cocina", "Estacionamiento"}, Description: "Acogedor y moderno departamento ubicado estratégicamente a pasos del Centro Comercial El Recreo.", Estado: "Libre",
		},
		{
			Name: "Departamento Familiar Solanda", Location: "Solanda, Quito Sur", Price: 45, Rating: 4.6, Reviews: 38, Type: "Departamentos", Capacity: 5, Image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=800&fit=crop",
			Images: []string{"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"},
			Amenities: []string{"WiFi", "Cocina", "Estacionamiento", "Mascotas"}, Description: "Espacioso departamento pensado para la familia en el dinámico barrio de Solanda.", Estado: "Libre",
		},
		{
			Name: "Loft Industrial Quitumbe", Location: "Quitumbe, Quito Sur", Price: 50, Rating: 4.9, Reviews: 15, Type: "Lofts", Capacity: 2, Image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=800&fit=crop",
			Images: []string{"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"},
			Amenities: []string{"WiFi", "TV", "Cocina"}, Description: "Hermoso loft de diseño industrial a minutos del Terminal Terrestre y la Plataforma Gubernamental del Sur.", Estado: "Ocupado",
		},
		{
			Name: "Casa de Retiro con Jardín", Location: "Cumbayá, Valles", Price: 150, Rating: 5.0, Reviews: 64, Type: "Casas", Capacity: 8, Image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
			Images: []string{"https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"},
			Amenities: []string{"WiFi", "Cocina", "Mascotas", "Estacionamiento", "Jacuzzi"}, Description: "Impresionante casa con amplio jardín cerrado en el cálido valle de Cumbayá.", Estado: "Libre",
		},
		{
			Name: "Suite Minimalista Ejecutiva", Location: "Bellavista, Quito Norte", Price: 45, Rating: 4.8, Reviews: 156, Type: "Suites", Capacity: 2, Image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
			Images: []string{"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?auto=format&fit=crop&w=1200&q=80"},
			Amenities: []string{"WiFi", "TV"}, Description: "Pequeña, elegante y con todo lo que necesitas. Un espacio diseñado meticulosamente para estancias cortas.", Estado: "Libre",
		},
		{
			Name: "Loft con Terraza Privada", Location: "La Floresta, Quito Centro", Price: 75, Rating: 4.9, Reviews: 112, Type: "Lofts", Capacity: 2, Image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80",
			Images: []string{"https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"},
			Amenities: []string{"WiFi", "TV", "Cocina", "Mascotas"}, Description: "Ubicado en el barrio más cultural y bohemio de la ciudad. Este loft destaca por su amplia terraza privada.", Estado: "Libre",
		},
		{
			Name: "Penthouse de Lujo", Location: "González Suárez, Quito Norte", Price: 180, Rating: 5.0, Reviews: 42, Type: "Departamentos", Capacity: 6, Image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
			Images: []string{"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1502672260266-1c1e525044c7?auto=format&fit=crop&w=1200&q=80"},
			Amenities: []string{"WiFi", "TV", "Cocina", "Estacionamiento", "Piscina", "Jacuzzi"}, Description: "Exclusivo penthouse con acabados de primera en el sector más cotizado de Quito.", Estado: "Ocupado",
		},
		{
			Name: "Villa Moderna con Piscina", Location: "Tumbaco, Valles", Price: 220, Rating: 4.9, Reviews: 58, Type: "Casas", Capacity: 10, Image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
			Images: []string{"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"},
			Amenities: []string{"WiFi", "TV", "Cocina", "Estacionamiento", "Piscina", "Mascotas"}, Description: "Clima cálido garantizado. Esta espectacular villa en Tumbaco ofrece piscina temperada.", Estado: "Mantenimiento",
		},
		{
			Name: "Suite Boutique Temática", Location: "La Mariscal, Quito Centro", Price: 50, Rating: 4.5, Reviews: 78, Type: "Suites", Capacity: 2, Image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=800&fit=crop",
			Images: []string{"https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&h=800&fit=crop"},
			Amenities: []string{"WiFi", "TV", "Estacionamiento"}, Description: "Suite con decoración vibrante en el corazón turístico de la capital (Plaza Foch).", Estado: "Libre",
		},
		{
			Name: "Piso Moderno y Céntrico", Location: "La Magdalena, Quito Sur", Price: 70, Rating: 4.6, Reviews: 92, Type: "Departamentos", Capacity: 5, Image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
			Images: []string{"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80"},
			Amenities: []string{"WiFi", "TV", "Cocina"}, Description: "Amplio departamento familiar cerca de vías principales y conexión al Metro de Quito.", Estado: "Libre",
		},
		{
			Name: "Casa Histórica San Marcos", Location: "San Marcos, Quito Centro", Price: 90, Rating: 4.9, Reviews: 205, Type: "Casas", Capacity: 5, Image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
			Images: []string{"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"},
			Amenities: []string{"WiFi", "Cocina", "Mascotas"}, Description: "Vive la historia en este barrio residencial y tranquilo del Centro Histórico.", Estado: "Ocupado",
		},
	}

	// Delete existing
	db.DB.Exec("DELETE FROM messages")
	db.DB.Exec("DELETE FROM contacts")
	db.DB.Exec("DELETE FROM cleaning_tasks")
	db.DB.Exec("DELETE FROM reservations")
	db.DB.Exec("DELETE FROM properties")
	db.DB.Exec("DELETE FROM payment_methods")
	db.DB.Exec("DELETE FROM users")

	// Seed User
	host := models.User{
		Nombre: "Admin Host", Email: "admin@smarthost.com", Telefono: "0999999999", Rol: "HOST",
	}
	db.DB.Create(&host)

	// Seed Payment Method
	payment := models.PaymentMethod{
		UsuarioID: host.ID, Tipo: "Tarjeta de Crédito", UltimosDigitos: "4321", Proveedor: "Visa", EsPrincipal: true,
	}
	db.DB.Create(&payment)

	for _, p := range properties {
		p.AnfitrionID = host.ID
		if err := db.DB.Create(&p).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
	}

	return c.JSON(fiber.Map{"message": "Database seeded successfully with Users, Payments and Properties!"})
}
