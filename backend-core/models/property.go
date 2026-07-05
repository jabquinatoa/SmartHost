package models

import (
	"gorm.io/gorm"
)

type Property struct {
	gorm.Model
	AnfitrionID uint     `json:"anfitrion_id"`
	Name        string   `json:"name"`
	Location    string   `json:"location"`
	Price       float64  `json:"price"`
	Rating      float64  `json:"rating"`
	Reviews     int      `json:"reviews"`
	Type        string   `json:"type"`
	Capacity    int      `json:"capacity"`
	Image       string   `json:"image"`
	Images      []string `json:"images" gorm:"serializer:json"`
	Amenities   []string `json:"amenities" gorm:"serializer:json"`
	Description string   `json:"description"`
	Estado      string   `json:"estado"`
}
