export interface Property {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  type: string;
  capacity: number;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  estado?: string;
}

export interface Reserva {
  id: number;
  propiedadId: number;
  nombrePropiedad: string;
  ubicacionPropiedad?: string;
  imagenPropiedad?: string;
  propiedadKey?: string;
  huesped: string;
  fechaCheckIn: Date;
  fechaCheckOut: Date;
  estado: 'Check-in' | 'Check-out' | 'Pendiente' | 'Reserva con éxito' | 'Cancelada';
  CreatedAt?: Date;
}

export interface TareaLimpieza {
  id: number;
  propiedad: string;
  descripcion: string;
  asignado: string;
  completada: boolean;
  diasNoDisponible: number;
}

export interface MetodoPago {
  id: number;
  tipo: 'Transferencia Bancaria' | 'DeUna' | 'Tarjeta';
  banco?: string;
  cuenta?: string;
  celular?: string;
  titular?: string;
  identificacion?: string;
}
