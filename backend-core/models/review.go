package models

import "gorm.io/gorm"

// Review represents a user review for a property
type Review struct {
	gorm.Model
	PropertyID uint   `json:"propiedad_id"`
	GuestName  string `json:"guest_name"`
	Rating     int    `json:"rating"`
	Comment    string `json:"comment"`
	Date       string `json:"date"`
}
