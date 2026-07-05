package models

import (
	"time"

	"gorm.io/gorm"
)

type Reservation struct {
	gorm.Model
	PropiedadID       uint       `json:"propiedad_id"`
	HuespedID         uint       `json:"huesped_id"`
	MetodoPagoID      uint       `json:"metodo_pago_id"`
	FechaCheckIn      time.Time  `json:"fecha_check_in"`
	FechaCheckOut     time.Time  `json:"fecha_check_out"`
	PrecioTotal       float64    `json:"precio_total"`
	Estado            string     `json:"estado"` // Pendiente, Confirmada, Cancelada, Completada
	FechaCancelacion  *time.Time `json:"fecha_cancelacion"`
	RazonCancelacion  string     `json:"razon_cancelacion"`
}
