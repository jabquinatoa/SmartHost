package models

import (
	"gorm.io/gorm"
)

type PaymentMethod struct {
	gorm.Model
	UsuarioID      uint   `json:"usuario_id"`
	Tipo           string `json:"tipo"` // Tarjeta de Crédito, Débito
	UltimosDigitos string `json:"ultimos_digitos"`
	Proveedor      string `json:"proveedor"` // Visa, Mastercard
	EsPrincipal    bool   `json:"es_principal"`
}
