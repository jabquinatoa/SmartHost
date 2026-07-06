package models

import (
	"gorm.io/gorm"
)

type PaymentMethod struct {
	gorm.Model
	UsuarioID      uint   `json:"usuario_id"`
	Tipo           string `json:"tipo"` // 'Transferencia Bancaria', 'DeUna', 'Tarjeta'
	Banco          string `json:"banco,omitempty"`
	Cuenta         string `json:"cuenta,omitempty"`
	Titular        string `json:"titular"`
	Celular        string `json:"celular,omitempty"`
	Identificacion string `json:"identificacion,omitempty"`
}
