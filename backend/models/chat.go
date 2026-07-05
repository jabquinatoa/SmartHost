package models

import (
	"time"

	"gorm.io/gorm"
)

type Contact struct {
	gorm.Model
	HuespedID         uint   `json:"huesped_id"`
	AnfitrionID       uint   `json:"anfitrion_id"`
	PropiedadID       uint   `json:"propiedad_id"`
	NoLeidosAnfitrion int    `json:"no_leidos_anfitrion"`
	NoLeidosViajero   int    `json:"no_leidos_viajero"`
}

type Message struct {
	gorm.Model
	ContactoID  uint      `json:"contacto_id"`
	RemitenteID uint      `json:"remitente_id"`
	Texto       string    `json:"texto"`
	Hora        time.Time `json:"hora"`
}
