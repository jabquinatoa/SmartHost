package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Nombre       string `json:"nombre"`
	Email        string `json:"email" gorm:"uniqueIndex"`
	Telefono     string `json:"telefono"`
	PasswordHash string `json:"-"`
	GoogleID     string `json:"google_id"`
	Rol          string `json:"rol"` // "ADMIN", "HOST", "GUEST"
}
