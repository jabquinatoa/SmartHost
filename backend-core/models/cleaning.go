package models

import (
	"gorm.io/gorm"
)

type CleaningTask struct {
	gorm.Model
	PropiedadID      uint   `json:"propiedad_id"`
	Descripcion      string `json:"descripcion"`
	Asignado         string `json:"asignado"`
	Completada       bool   `json:"completada"`
	DiasNoDisponible int    `json:"dias_no_disponible"`
}
