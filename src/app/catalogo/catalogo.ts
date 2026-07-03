import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Property {
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

interface Reserva {
  id: number;
  propiedadId: number;
  nombrePropiedad: string;
  ubicacionPropiedad?: string;
  imagenPropiedad?: string;
  propiedadKey?: string;
  huesped: string;
  fechaCheckIn: Date;
  fechaCheckOut: Date;
  estado: 'Check-in' | 'Check-out' | 'Pendiente' | 'Reserva con éxito';
}

interface TareaLimpieza {
  id: number;
  propiedad: string;
  descripcion: string;
  asignado: string;
  completada: boolean;
  diasNoDisponible: number;
}

interface ChatMessage {
  id: number;
  texto: string;
  enviado: boolean;
  hora: string;
}

interface Contacto {
  id: number;
  nombre: string;
  email: string;            // vincula el chat con el usuario logueado
  ultimo: string;
  tiempo: string;
  noLeidos: number;         // no leídos por el ANFITRIÓN
  noLeidosViajero: number;  // no leídos por el VIAJERO
  propiedad: string;
  propiedadId: number;      // para reencontrar el hilo al reservar/contactar
  imagen: string;
  fechas: string;
  chat: ChatMessage[];
}


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html'
})
export class CatalogoComponent implements OnInit {

  // --- SISTEMA AUTOMÁTICO DE NOTIFICACIONES ANIMADAS ---
  // Variables del Toast Animado
  toastMsg: string | null = null;
  toastState: string | null = null;
  private toastTimeout: any;
  private leaveTimeout: any;
  // -------------------------------------------------------


  properties: Property[] = [
    {
      id: 1,
      name: 'Loft Moderno Parque La Carolina',
      location: 'La Carolina, Quito Norte',
      price: 65,
      rating: 4.9,
      reviews: 128,
      type: 'Lofts',
      capacity: 4,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
      ],
      amenities: ['WiFi', 'Cocina', 'TV', 'Estacionamiento'],
      description: 'Hermoso loft completamente amueblado a pasos del Parque La Carolina y los mejores centros comerciales de la ciudad.\n\nEl espacio está diseñado con un concepto abierto, permitiendo que la luz natural inunde cada rincón. Disfrutarás de vistas panorámicas de la ciudad desde tu ventana mientras tomas tu café matutino.',
      estado: 'Libre'
    },
    {
      id: 2,
      name: 'Casa Patrimonial Restaurada',
      location: 'Centro Histórico, Quito Centro',
      price: 85,
      rating: 4.8,
      reviews: 89,
      type: 'Casas',
      capacity: 6,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop',
      ],
      amenities: ['WiFi', 'Cocina', 'Mascotas'],
      description: 'Sumérgete en la magia y la historia del Primer Patrimonio Cultural de la Humanidad alojándote en esta auténtica joya arquitectónica colonial.\n\nLa casa cuenta con un patio central empedrado adornado con plantas nativas, pasillos de madera tallada y mobiliario de época restaurado con todas las comodidades modernas.',
      estado: 'Ocupado'
    },
    {
      id: 3,
      name: 'Suite Ejecutiva frente al CCI',
      location: 'La Carolina, Quito Norte',
      price: 90,
      rating: 5.0,
      reviews: 64,
      type: 'Suites',
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop',
      ],
      amenities: ['WiFi', 'TV', 'Estacionamiento', 'Jacuzzi'],
      description: 'Suite de lujo con acabados de primera calidad, ideal para ejecutivos. El edificio es uno de los más exclusivos del sector, brindando a nuestros huéspedes seguridad 24/7 y acceso a gimnasio.',
      estado: 'Mantenimiento'
    },
    {
      id: 4,
      name: 'Departamento Moderno El Recreo',
      location: 'El Recreo, Quito Sur',
      price: 55,
      rating: 4.7,
      reviews: 42,
      type: 'Departamentos',
      capacity: 4,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      ],
      amenities: ['WiFi', 'TV', 'Cocina', 'Estacionamiento'],
      description: 'Acogedor y moderno departamento ubicado estratégicamente a pasos del Centro Comercial El Recreo. Excelente iluminación, internet de fibra óptica y una cocina totalmente equipada para estancias medianas o largas.',
      estado: 'Libre'
    },
    {
      id: 5,
      name: 'Departamento Familiar Solanda',
      location: 'Solanda, Quito Sur',
      price: 45,
      rating: 4.6,
      reviews: 38,
      type: 'Departamentos',
      capacity: 5,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      ],
      amenities: ['WiFi', 'Cocina', 'Estacionamiento', 'Mascotas'],
      description: 'Espacioso departamento pensado para la familia en el dinámico barrio de Solanda. Cerca de parques locales, estaciones de transporte público y zona comercial. Perfecto para sentirte como en casa.',
      estado: 'Libre'
    },
    {
      id: 6,
      name: 'Loft Industrial Quitumbe',
      location: 'Quitumbe, Quito Sur',
      price: 50,
      rating: 4.9,
      reviews: 15,
      type: 'Lofts',
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      ],
      amenities: ['WiFi', 'TV', 'Cocina'],
      description: 'Hermoso loft de diseño industrial a minutos del Terminal Terrestre y la Plataforma Gubernamental del Sur. Ideal para viajes rápidos, estudiantes o profesionales que necesitan acceso rápido al sur de la ciudad.',
      estado: 'Ocupado'
    },
    {
      id: 7,
      name: 'Casa de Retiro con Jardín',
      location: 'Cumbayá, Valles',
      price: 150,
      rating: 5.0,
      reviews: 64,
      type: 'Casas',
      capacity: 8,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['WiFi', 'Cocina', 'Mascotas', 'Estacionamiento', 'Jacuzzi'],
      description: 'Impresionante casa con amplio jardín cerrado en el cálido valle de Cumbayá. Perfecto para que tus mascotas jueguen con total seguridad o para armar tus reuniones familiares. Incluye zona de BBQ y amplios espacios de descanso.',
      estado: 'Libre'
    },
    {
      id: 8,
      name: 'Suite Minimalista Ejecutiva',
      location: 'Bellavista, Quito Norte',
      price: 45,
      rating: 4.8,
      reviews: 156,
      type: 'Suites',
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['WiFi', 'TV'],
      description: 'Pequeña, elegante y con todo lo que necesitas. Un espacio diseñado meticulosamente para estancias cortas, con escritorio de trabajo, luz natural y acceso rápido a vías principales de la capital.',
      estado: 'Libre'
    },
    {
      id: 9,
      name: 'Loft con Terraza Privada',
      location: 'La Floresta, Quito Centro',
      price: 75,
      rating: 4.9,
      reviews: 112,
      type: 'Lofts',
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['WiFi', 'TV', 'Cocina', 'Mascotas'],
      description: 'Ubicado en el barrio más cultural y bohemio de la ciudad. Este loft destaca por su amplia terraza privada, ideal para tomar un café por la mañana, leer un libro o disfrutar del atardecer quiteño.',
      estado: 'Libre'
    },
    {
      id: 10,
      name: 'Penthouse de Lujo',
      location: 'González Suárez, Quito Norte',
      price: 180,
      rating: 5.0,
      reviews: 42,
      type: 'Departamentos',
      capacity: 6,
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1e525044c7?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['WiFi', 'TV', 'Cocina', 'Estacionamiento', 'Piscina', 'Jacuzzi'],
      description: 'Exclusivo penthouse con acabados de primera en el sector más cotizado de Quito. Cuenta con ventanales de piso a techo, jacuzzi privado, y acceso a todas las áreas exclusivas del edificio inteligente.',
      estado: 'Ocupado'
    },
    {
      id: 11,
      name: 'Villa Moderna con Piscina',
      location: 'Tumbaco, Valles',
      price: 220,
      rating: 4.9,
      reviews: 58,
      type: 'Casas',
      capacity: 10,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['WiFi', 'TV', 'Cocina', 'Estacionamiento', 'Piscina', 'Mascotas'],
      description: 'Clima cálido garantizado. Esta espectacular villa en Tumbaco ofrece piscina temperada, zona de parrilladas y extensas áreas verdes. La elección perfecta para un fin de semana con amigos o retiros familiares.',
      estado: 'Mantenimiento'
    },
    {
      id: 12,
      name: 'Suite Boutique Temática',
      location: 'La Mariscal, Quito Centro',
      price: 50,
      rating: 4.5,
      reviews: 78,
      type: 'Suites',
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&h=800&fit=crop'
      ],
      amenities: ['WiFi', 'TV', 'Estacionamiento'],
      description: 'Suite con decoración vibrante en el corazón turístico de la capital (Plaza Foch). Tendrás a un paso los mejores restaurantes, cafeterías, vida nocturna y conexiones de transporte rápido.',
      estado: 'Libre'
    },
    {
      id: 13,
      name: 'Piso Moderno y Céntrico',
      location: 'La Magdalena, Quito Sur',
      price: 70,
      rating: 4.6,
      reviews: 92,
      type: 'Departamentos',
      capacity: 5,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['WiFi', 'TV', 'Cocina'],
      description: 'Amplio departamento familiar cerca de vías principales y conexión al Metro de Quito. Espacios muy bien distribuidos y una zona de lavandería equipada para tu máxima comodidad.',
      estado: 'Libre'
    },
    {
      id: 14,
      name: 'Casa Histórica San Marcos',
      location: 'San Marcos, Quito Centro',
      price: 90,
      rating: 4.9,
      reviews: 205,
      type: 'Casas',
      capacity: 5,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: ['WiFi', 'Cocina', 'Mascotas'],
      description: 'Vive la historia en este barrio residencial y tranquilo del Centro Histórico. Patios interiores con piletas, corredores adornados y un ambiente mágico que te transporta al pasado quiteño.',
      estado: 'Ocupado'
    }
  ];

  reservasBase: Reserva[] = [
    { id: 1, propiedadId: 1, nombrePropiedad: 'Loft Moderno Parque La Carolina', huesped: 'Carlos M.', fechaCheckIn: new Date(), fechaCheckOut: new Date(new Date().setDate(new Date().getDate() + 3)), estado: 'Check-out' },
    { id: 2, propiedadId: 2, nombrePropiedad: 'Casa Patrimonial Restaurada', huesped: 'Familia Gómez', fechaCheckIn: new Date(), fechaCheckOut: new Date(new Date().setDate(new Date().getDate() + 5)), estado: 'Check-in' }
  ];

  tareasLimpieza: TareaLimpieza[] = [
    { id: 1, propiedad: 'Suite Ejecutiva frente al CCI', descripcion: 'Limpieza profunda', asignado: 'María', completada: false, diasNoDisponible: 1 },
    { id: 2, propiedad: 'Loft Moderno Parque La Carolina', descripcion: 'Reposición de sábanas', asignado: 'Juan', completada: false, diasNoDisponible: 1 }
  ];

  // FIX: se agregó 'mensajes' para la nueva vista de chat del lado viajero
  activeView: 'catalogo' | 'detalle' | 'favoritos' | 'mis-viajes' | 'configuracion' | 'mensajes' | 'admin' = 'catalogo';
  selectedProperty: Property | null = null;

  activeFilter = 'Todos';
  favorites: string[] = [];
  activeSearchTab: 'destino' | 'fechas' | 'huespedes' | null = null;
  selectedDestino = '';
  selDateIn: Date | null = null;
  selDateOut: Date | null = null;
  adults = 2;
  children = 0;

  baseMonth = new Date();
  monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  isDetailCalendarOpen = false;
  isDetailGuestOpen = false;

  isContactModalOpen = false;
  isFiltrosOpen = false;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  priceMin = '';
  priceMax = '';
  selectedAmenities: string[] = [];

  // Auth & Session
  isAuthModalOpen = false;
  authMode: 'login' | 'register' = 'login';
  authEmail = '';
  authPassword = '';
  authName = '';
  isLoggedIn = false;
  userName = '';
  userEmail = '';
  userPhone = '';
  contactMessage = '';

  // Chat del lado VIAJERO (vista 'mensajes') — NUEVO
  contactoClienteActivo: Contacto | null = null;
  clienteMensajeInput: string = '';

  // Configuración de la cuenta
  configTab: 'info' | 'seguridad' | 'notificaciones' = 'info';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  notifEmail = true;
  notifSms = false;
  notifPromos = true;

  filterOptions = ['Todos', 'Departamentos', 'Suites', 'Casas', 'Lofts'];
  filterAmenities = ['WiFi', 'Mascotas', 'Estacionamiento', 'Piscina', 'Cocina', 'Jacuzzi'];

  destinations = [
    { city: 'Quito Norte', neighborhoods: ['La Carolina', 'González Suárez', 'Bellavista'] },
    { city: 'Quito Centro', neighborhoods: ['Centro Histórico', 'La Mariscal', 'La Floresta', 'San Marcos'] },
    { city: 'Quito Sur', neighborhoods: ['Quitumbe', 'Solanda', 'El Recreo', 'La Magdalena'] },
    { city: 'Valles', neighborhoods: ['Cumbayá', 'Tumbaco'] },
  ];

  adminView: 'inicio' | 'propiedades' | 'mensajes' | 'calendario' = 'inicio';
  isAdminSidebarOpen = true;
  isAdminPropertyModalOpen = false;
  isEditingProperty = false;
  adminPropertyForm = { id: 0, nombre: '', precio: '', descripcion: '', estado: 'Libre', imagen: '' };
  adminReservaSeleccionada: Reserva | null = null;


  propiedadesCalendario: any[] = this.properties.map(p => ({
    id: p.id,
    nombre: p.name,
    diasOcupados: []
  }));


  adminMesActual: Date = new Date();
  adminDiasSeleccionados: number[] = [];
  adminPropiedadSeleccionadaId: number = 1;
  adminDiasSemana = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  adminPropiedadesFiltro: string = "Todos";

  isLightboxOpen = false;
  currentLightboxIndex = 0;

  openLightbox(index: number) {
    if (this.selectedProperty && this.selectedProperty.images.length > 0) {
      this.currentLightboxIndex = index;
      this.isLightboxOpen = true;
    }
  }

  closeLightbox() { this.isLightboxOpen = false; }
  nextLightboxImage(event: Event) {
    event.stopPropagation();
    if (this.selectedProperty) this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.selectedProperty.images.length;
  }
  prevLightboxImage(event: Event) {
    event.stopPropagation();
    if (this.selectedProperty) this.currentLightboxIndex = (this.currentLightboxIndex - 1 + this.selectedProperty.images.length) % this.selectedProperty.images.length;
  }

  amenityImages: Record<string, string> = {
    'WiFi': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    'Cocina': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop',
    'TV': 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=400&fit=crop',
    'Estacionamiento': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    'Mascotas': 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
    'Jacuzzi': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop',
    'Piscina': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop'
  };

  amenityDescriptions: Record<string, string> = {
    'WiFi': 'Conexión de alta velocidad perfecta para trabajar o streaming.',
    'Cocina': 'Totalmente equipada con electrodomésticos modernos.',
    'TV': 'Pantalla plana con acceso a tus plataformas favoritas.',
    'Estacionamiento': 'Espacio privado y seguro para tu vehículo.',
    'Mascotas': 'Tu amigo peludo es totalmente bienvenido.',
    'Jacuzzi': 'Relájate y disfruta de un baño con hidromasaje.',
    'Piscina': 'Piscina al aire libre ideal para refrescarse.'
  };

  getAmenityImage(amenity: string): string { return this.amenityImages[amenity] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop'; }
  getAmenityDescription(amenity: string): string { return this.amenityDescriptions[amenity] || 'Comodidad esencial incluida para tu estancia.'; }

  adminSearchQuery = '';
  isAdminSearchOpen = false;

  get adminSearchRes() {
    if (!this.adminSearchQuery.trim()) return [];
    const q = this.adminSearchQuery.toLowerCase();
    const resProps = this.properties.filter(p => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)).map(p => ({ type: 'Propiedad', title: p.name, subtitle: p.location, obj: p }));
    const resReservas = this.reservasBase.filter(r => r.huesped.toLowerCase().includes(q) || r.nombrePropiedad.toLowerCase().includes(q)).map(r => ({ type: 'Reserva', title: `Reserva de ${r.huesped}`, subtitle: r.nombrePropiedad, obj: r }));
    return [...resProps, ...resReservas].slice(0, 5);
  }

  hideAdminSearchDelay() { setTimeout(() => this.isAdminSearchOpen = false, 200); }

  clickAdminSearch(res: any) {
    if (res.type === 'Propiedad') { this.setAdminView('propiedades'); this.adminOpenEditarPropiedad(res.obj); }
    else if (res.type === 'Reserva') { this.setAdminView('inicio'); this.verDetallesReserva(res.obj); }
    this.adminSearchQuery = '';
    this.isAdminSearchOpen = false;
  }

  adminNotificaciones = [
    { id: 1, titulo: "Nueva actualización", mensaje: "¡Bienvenido a tu panel renovado de Smart Host!", tiempo: "Hace 5 min", leida: false },
    { id: 2, titulo: "Mensaje de Pedro Ruiz", mensaje: "Perfecto, nos vemos mañana", tiempo: "Hace 1 hora", leida: false }
  ];

  get notificacionesNoLeidas() { return this.adminNotificaciones.filter(n => !n.leida).length; }
  marcarTodasLeidas() { this.adminNotificaciones.forEach(n => n.leida = true); this.saveData(); }
  get adminPropiedadesFiltradas() {
    if (this.adminPropiedadesFiltro === "Todos") return this.properties;
    return this.properties.filter(p => p.type === this.adminPropiedadesFiltro || p.estado === this.adminPropiedadesFiltro);
  }

  adminMensajesTab: 'chats' | 'resenas' = 'chats';
  adminMensajesBusqueda: string = "";
  adminMensajeInput: string = "";

  adminContactos: Contacto[] = [
    {
      id: 1, nombre: "Carlos Martinez", email: "carlos.martinez@email.com", ultimo: "Gracias por la info!", tiempo: "10:40", noLeidos: 2, noLeidosViajero: 0,
      propiedad: "Loft Moderno Parque La Carolina", propiedadId: 1,
      imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop", fechas: "15-18 Ene 2026",
      chat: [
        { id: 1, texto: "Hola, ¿el loft tiene estacionamiento incluido?", enviado: false, hora: "10:15" },
        { id: 2, texto: "¡Hola Carlos! Sí, cuenta con un espacio de estacionamiento privado incluido.", enviado: true, hora: "10:22" },
        { id: 3, texto: "Perfecto, ¿y el check-in es flexible?", enviado: false, hora: "10:35" },
        { id: 4, texto: "Claro, desde las 3pm en adelante, con cerradura inteligente para llegada autónoma.", enviado: true, hora: "10:38" },
        { id: 5, texto: "Gracias por la info!", enviado: false, hora: "10:40" }
      ]
    },
    {
      id: 2, nombre: "Familia Gómez", email: "familia.gomez@email.com", ultimo: "Nos vemos el jueves entonces", tiempo: "Ayer", noLeidos: 0, noLeidosViajero: 0,
      propiedad: "Casa Patrimonial Restaurada", propiedadId: 2,
      imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop", fechas: "5-10 Jul 2026",
      chat: [
        { id: 1, texto: "Buenas tardes, somos 6 personas ¿la casa tiene suficientes camas?", enviado: false, hora: "Ayer 16:02" },
        { id: 2, texto: "¡Buenas! Sí, tiene capacidad para 6 huéspedes con habitaciones separadas.", enviado: true, hora: "Ayer 16:10" },
        { id: 3, texto: "Nos vemos el jueves entonces", enviado: false, hora: "Ayer 16:12" }
      ]
    },
    {
      id: 3, nombre: "Roberto Díaz", email: "roberto.diaz@email.com", ultimo: "¿Podrían mejorar el WiFi para esa fecha?", tiempo: "Lun", noLeidos: 1, noLeidosViajero: 0,
      propiedad: "Suite Ejecutiva frente al CCI", propiedadId: 3,
      imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop", fechas: "20-22 Jul 2026",
      chat: [
        { id: 1, texto: "Necesito la suite para una videollamada de trabajo importante.", enviado: false, hora: "Lun 09:14" },
        { id: 2, texto: "El WiFi de la suite es de fibra óptica de alta velocidad, ideal para eso.", enviado: true, hora: "Lun 09:30" },
        { id: 3, texto: "¿Podrían mejorar el WiFi para esa fecha?", enviado: false, hora: "Lun 09:45" }
      ]
    }
  ];

  // FIX: esta propiedad se usaba en adminSeleccionarContacto(), adminEnviarMensaje() y
  // loadData() pero nunca estaba declarada — el archivo no podía compilar. Se inicializa
  // con el primer contacto de la lista, igual que hacía loadData() al cargar datos guardados.
  adminContactoActivo: Contacto = this.adminContactos[0];

  adminResenas: any[] = [
    { id: 1, nombre: "Laura Mendez", propiedad: "Loft Moderno Parque La Carolina", rating: 5, texto: "Excelente ubicacion y muy limpio. Volveria sin duda!", fecha: "hace 2 dias" },
    { id: 2, nombre: "Roberto Diaz", propiedad: "Suite Ejecutiva con Vista al Pichincha", rating: 4, texto: "Muy comodo para viajes de trabajo. Solo falta mejor WiFi.", fecha: "hace 1 semana" }
  ];

  get adminContactosFiltrados() { return this.adminContactos.filter(c => c.nombre.toLowerCase().includes(this.adminMensajesBusqueda.toLowerCase())); }
  get ocupacionPorcentajeGeneral() { return 75; }
  get totalReservasMes() { return 15; }
  get totalLimpiezasPendientes() { return this.tareasLimpieza.filter(t => !t.completada).length; }
  get totalMensajesNuevos() { return this.adminContactos.reduce((total, contacto) => total + contacto.noLeidos, 0); }
  get checkinsHoy() { return this.reservasBase; }

  // Getters del lado VIAJERO para la vista 'mensajes' — NUEVO
  get misContactos() {
    return this.adminContactos.filter(c => this.userEmail !== '' && c.email === this.userEmail);
  }
  get totalMensajesNoLeidosCliente() {
    return this.misContactos.reduce((total, c) => total + (c.noLeidosViajero || 0), 0);
  }

  ngOnInit() { this.loadData(); }

  private normalizarContacto(c: any): Contacto {
    const prop = this.properties.find(p => p.id === c.propiedadId || p.name === c.propiedad);
    const chatBase = Array.isArray(c.chat) ? c.chat : [];
    const chat: ChatMessage[] = chatBase.map((m: any, index: number) => ({
      id: m.id || index + 1,
      texto: m.texto || '',
      enviado: !!m.enviado,
      hora: m.hora || c.tiempo || 'ahora'
    })).filter((m: ChatMessage) => m.texto.trim() !== '');

    const ultimo = c.ultimo || (chat.length > 0 ? chat[chat.length - 1].texto : '');
    const tiempo = c.tiempo || (chat.length > 0 ? chat[chat.length - 1].hora : 'ahora');

    if (chat.length === 0 && ultimo.trim() !== '') {
      chat.push({ id: 1, texto: ultimo, enviado: false, hora: tiempo });
    }

    return {
      id: Number(c.id) || Date.now(),
      nombre: c.nombre || 'Viajero',
      email: c.email || '',
      ultimo,
      tiempo,
      noLeidos: Number(c.noLeidos) || 0,
      noLeidosViajero: Number(c.noLeidosViajero) || 0,
      propiedad: c.propiedad || prop?.name || 'Propiedad',
      propiedadId: Number(c.propiedadId) || prop?.id || 0,
      imagen: c.imagen || prop?.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=200&fit=crop',
      fechas: c.fechas || 'Sin fechas',
      chat
    };
  }

  private mezclarContactosGuardados(saved: any[]): Contacto[] {
    const contactosBase = this.adminContactos.map(c => this.normalizarContacto(c));
    const contactosGuardados = saved.map(c => this.normalizarContacto(c));
    const mezclados = [...contactosGuardados];

    contactosBase.forEach(base => {
      const existente = mezclados.find(c =>
        c.id === base.id ||
        (c.email !== '' && c.email === base.email && c.propiedadId === base.propiedadId) ||
        (c.nombre === base.nombre && c.propiedad === base.propiedad)
      );
      if (!existente) {
        mezclados.push(base);
        return;
      }

      if (existente.chat.length < base.chat.length) {
        const mensajesExtra = existente.chat.filter(m => !base.chat.some(b => b.texto === m.texto && b.hora === m.hora));
        existente.chat = [...base.chat, ...mensajesExtra];
        existente.ultimo = existente.chat[existente.chat.length - 1].texto;
        existente.tiempo = existente.chat[existente.chat.length - 1].hora;
      }
      if (!existente.email) existente.email = base.email;
      if (!existente.propiedadId) existente.propiedadId = base.propiedadId;
      if (!existente.fechas || existente.fechas === 'Sin fechas') existente.fechas = base.fechas;
      if (!existente.imagen) existente.imagen = base.imagen;
    });

    return mezclados;
  }

  private moverContactoArriba(contacto: Contacto) {
    this.adminContactos = [contacto, ...this.adminContactos.filter(c => c.id !== contacto.id)];
  }

  private getPropertyKey(property: Property): string {
    return `${property.id}|${property.name}|${property.location}`;
  }

  private findPropertyForReservation(reserva: Partial<Reserva>): Property | undefined {
    if (reserva.propiedadKey) {
      const [idRaw, name, location] = reserva.propiedadKey.split('|');
      const id = Number(idRaw);
      const exact = this.properties.find(p => p.id === id && p.name === name && p.location === location);
      if (exact) return exact;
    }

    return this.properties.find(p => p.id === reserva.propiedadId && p.name === reserva.nombrePropiedad)
      || this.properties.find(p => p.name === reserva.nombrePropiedad)
      || this.properties.find(p => p.id === reserva.propiedadId);
  }

  private normalizarReserva(r: any): Reserva {
    const fechaCheckIn = new Date(r.fechaCheckIn);
    const fechaCheckOut = new Date(r.fechaCheckOut);
    const prop = this.findPropertyForReservation({
      propiedadId: Number(r.propiedadId),
      nombrePropiedad: r.nombrePropiedad,
      propiedadKey: r.propiedadKey
    });

    return {
      id: Number(r.id) || Date.now(),
      propiedadId: prop?.id || Number(r.propiedadId) || 0,
      nombrePropiedad: prop?.name || r.nombrePropiedad || 'Propiedad reservada',
      ubicacionPropiedad: prop?.location || r.ubicacionPropiedad || '',
      imagenPropiedad: prop?.image || r.imagenPropiedad || '',
      propiedadKey: prop ? this.getPropertyKey(prop) : r.propiedadKey,
      huesped: r.huesped || 'Viajero',
      fechaCheckIn,
      fechaCheckOut,
      estado: r.estado === 'Pendiente' ? 'Reserva con éxito' : (r.estado || 'Reserva con éxito')
    };
  }

  private bloquearFechasReserva(property: Property, checkIn: Date, checkOut: Date, enfocarCalendario = true) {
    let propAdmin = this.propiedadesCalendario.find(p => p.id === property.id || p.nombre === property.name);
    if (!propAdmin) {
      propAdmin = { id: property.id, nombre: property.name, diasOcupados: [] };
      this.propiedadesCalendario.push(propAdmin);
    }

    const diasReservados: number[] = [];
    const cursor = new Date(checkIn);
    while (cursor < checkOut) {
      diasReservados.push(cursor.getDate());
      cursor.setDate(cursor.getDate() + 1);
    }

    propAdmin.id = property.id;
    propAdmin.nombre = property.name;
    propAdmin.diasOcupados = [...new Set([...propAdmin.diasOcupados, ...diasReservados])].sort((a, b) => a - b);
    if (enfocarCalendario) {
      this.adminPropiedadSeleccionadaId = property.id;
      this.adminMesActual = new Date(checkIn.getFullYear(), checkIn.getMonth(), 1);
    }
  }

  private mergeProperties(saved: any[]): Property[] {
    // Parte de las propiedades por defecto del código y les aplica encima
    // cualquier edición guardada (precio, estado, descripción, imagen)
    const merged = this.properties.map(defaultProp => {
      const savedProp = saved.find((sp: any) => sp.id === defaultProp.id);
      return savedProp ? { ...defaultProp, ...savedProp } : defaultProp;
    });
    // Agrega propiedades nuevas creadas desde el panel de administrador
    saved.forEach((sp: any) => {
      if (!merged.find(p => p.id === sp.id)) merged.push(sp);
    });
    return merged;
  }

  loadData() {
    const savedData = localStorage.getItem('smartHostDB');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);

        if (parsed.properties) {
          this.properties = this.mergeProperties(parsed.properties).map((p: Property) => {
            if (!p.images || p.images.length < 3) {
              p.images = [
                p.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop'
              ];
            }
            return p;
          });
        }

        if (parsed.favorites) {
          this.favorites = parsed.favorites
            .map((fav: any) => this.normalizeFavoriteKey(fav))
            .filter((fav: string | null, index: number, arr: (string | null)[]) => fav !== null && arr.indexOf(fav) === index) as string[];
        }

        if (parsed.reservasBase) {
          this.reservasBase = parsed.reservasBase.map((r: any) => this.normalizarReserva(r));
        }

        if (parsed.tareasLimpieza) this.tareasLimpieza = parsed.tareasLimpieza;

        // Reconstruye el calendario desde TODAS las propiedades actuales,
        // conservando los días ya bloqueados si existían en el localStorage.
        this.propiedadesCalendario = this.properties.map(p => {
          const guardada = parsed.propiedadesCalendario?.find((pc: any) => pc.id === p.id);
          return {
            id: p.id,
            nombre: p.name,
            diasOcupados: guardada ? guardada.diasOcupados : []
          };
        });

        this.reservasBase.forEach(reserva => {
          const prop = this.findPropertyForReservation(reserva);
          if (prop && reserva.estado !== 'Check-out') {
            this.bloquearFechasReserva(prop, reserva.fechaCheckIn, reserva.fechaCheckOut, false);
          }
        });

        if (parsed.isLoggedIn !== undefined) this.isLoggedIn = parsed.isLoggedIn;
        if (parsed.userName) this.userName = parsed.userName;
        if (parsed.userEmail) this.userEmail = parsed.userEmail;
        if (parsed.userPhone) this.userPhone = parsed.userPhone;
        if (parsed.adminNotificaciones) this.adminNotificaciones = parsed.adminNotificaciones;

        // Migración defensiva: completa contactos viejos y conserva las
        // simulaciones base cuando localStorage trae una lista incompleta.
        if (parsed.adminContactos) {
          this.adminContactos = this.mezclarContactosGuardados(parsed.adminContactos);
        }
        if (this.adminContactos.length > 0) this.adminContactoActivo = this.adminContactos[0];
      } catch (e) { console.error("Error al cargar datos locales", e); }
    }
  }

  saveData() {
    const dataToSave = {
      properties: this.properties,
      favorites: this.favorites,
      reservasBase: this.reservasBase,
      tareasLimpieza: this.tareasLimpieza,
      propiedadesCalendario: this.propiedadesCalendario,
      adminContactos: this.adminContactos,
      isLoggedIn: this.isLoggedIn,
      userName: this.userName,
      userEmail: this.userEmail,
      userPhone: this.userPhone,
      adminNotificaciones: this.adminNotificaciones
    };
    localStorage.setItem('smartHostDB', JSON.stringify(dataToSave));
  }

  scrollToLimpiezas() {
    const element = document.getElementById('limpiezas-seccion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-[#0055FF]', 'transition-all', 'duration-500');
      setTimeout(() => element.classList.remove('ring-2', 'ring-[#0055FF]'), 1500);
    }
  }

  verDetallesReserva(res: Reserva) { this.adminReservaSeleccionada = res; }
  cerrarDetallesReserva() { this.adminReservaSeleccionada = null; }
  marcarLimpieza(tarea: TareaLimpieza) {
    tarea.completada = !tarea.completada;
    this.showToast(tarea.completada ? `Limpieza de ${tarea.propiedad} completada` : `Tarea de ${tarea.propiedad} reabierta`);
    this.saveData();
  }

  adminOpenNuevaPropiedad() {
    this.isEditingProperty = false;
    this.adminPropertyForm = { id: 0, nombre: '', precio: '', descripcion: '', estado: 'Libre', imagen: '' };
    this.isAdminPropertyModalOpen = true;
  }

  adminOpenEditarPropiedad(prop: Property) {
    this.isEditingProperty = true;
    this.adminPropertyForm = { id: prop.id, nombre: prop.name, precio: prop.price.toString(), descripcion: prop.description, estado: prop.estado || 'Libre', imagen: prop.image };
    this.isAdminPropertyModalOpen = true;
  }

  adminGuardarPropiedad() {
    if (!this.adminPropertyForm.nombre || !this.adminPropertyForm.precio) {
      this.showToast('Por favor, llena los campos principales.'); return;
    }
    if (this.isEditingProperty) {
      const index = this.properties.findIndex(p => p.id === this.adminPropertyForm.id);
      if (index !== -1) {
        this.properties[index].name = this.adminPropertyForm.nombre;
        this.properties[index].price = parseFloat(this.adminPropertyForm.precio.replace('$', '')) || 0;
        this.properties[index].description = this.adminPropertyForm.descripcion;
        this.properties[index].estado = this.adminPropertyForm.estado;
        if (this.adminPropertyForm.imagen) this.properties[index].image = this.adminPropertyForm.imagen;
      }
      this.showToast('Propiedad actualizada exitosamente');
    } else {
      const newId = this.properties.length > 0 ? Math.max(...this.properties.map(p => p.id)) + 1 : 1;
      const newProp: Property = {
        id: newId, name: this.adminPropertyForm.nombre, location: 'Quito, Ecuador',
        price: parseFloat(this.adminPropertyForm.precio.replace('$', '')) || 50, rating: 0, reviews: 0, type: 'Departamentos', capacity: 2,
        image: this.adminPropertyForm.imagen || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        images: [
          this.adminPropertyForm.imagen || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop'
        ],
        amenities: ['WiFi', 'TV'], description: this.adminPropertyForm.descripcion || 'Nueva propiedad en Smart Host.', estado: this.adminPropertyForm.estado
      };
      this.properties.unshift(newProp);
      this.propiedadesCalendario.push({ id: newId, nombre: newProp.name, diasOcupados: [] });
      this.showToast('Propiedad creada exitosamente');
    }
    this.isAdminPropertyModalOpen = false;
    this.saveData();
  }

  adminSimularCargaImagen(event: any) {
    this.adminPropertyForm.imagen = 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop';
    this.showToast('Imagen cargada');
  }

  goToAdminPanel() {
    this.isUserMenuOpen = false;
    this.showToast('Preparando tu panel de anfitrión...');
    setTimeout(() => { this.activeView = 'admin'; this.adminView = 'inicio'; window.scrollTo(0, 0); }, 100);
  }
  exitAdminPanel() { this.activeView = 'catalogo'; this.showToast('Volviendo al modo viaje...'); }
  setAdminView(view: any) {
    this.adminView = view;
    if (window.innerWidth < 1024) this.isAdminSidebarOpen = false;
  }
  get adminViewTitle() {
    switch (this.adminView) {
      case 'inicio': return 'Resumen Operativo'; case 'propiedades': return 'Mis Propiedades';
      case 'mensajes': return 'Centro de Mensajes'; case 'calendario': return 'Calendario de Reservas'; default: return 'Panel de Control';
    }
  }

  get adminPropiedadSeleccionada() { return this.propiedadesCalendario.find(p => p.id === this.adminPropiedadSeleccionadaId) || this.propiedadesCalendario[0]; }
  get adminNombreMes() { return this.adminMesActual.toLocaleDateString("es-ES", { month: "long", year: "numeric" }); }
  get adminDiasEnMes() { return new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth() + 1, 0).getDate(); }
  get adminDiaSemanaInicio() { return new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth(), 1).getDay(); }
  get adminEmptyDays() { return Array(this.adminDiaSemanaInicio).fill(null); }
  get adminDaysArray() { return Array.from({ length: this.adminDiasEnMes }, (_, i) => i + 1); }
  get adminOcupacionPorcentaje() { return Math.round((this.adminPropiedadSeleccionada.diasOcupados.length / this.adminDiasEnMes) * 100); }

  adminHandlePropiedadChange(event: any) { this.adminPropiedadSeleccionadaId = Number(event.target.value); this.adminDiasSeleccionados = []; }
  adminToggleDia(dia: number) {
    if (this.adminPropiedadSeleccionada.diasOcupados.includes(dia)) return;
    const index = this.adminDiasSeleccionados.indexOf(dia);
    if (index > -1) this.adminDiasSeleccionados.splice(index, 1);
    else this.adminDiasSeleccionados.push(dia);
  }

  adminBloquearFechas() {
    if (this.adminDiasSeleccionados.length === 0) { this.showToast("Selecciona al menos un dia para bloquear"); return; }
    this.adminPropiedadSeleccionada.diasOcupados.push(...this.adminDiasSeleccionados);
    this.showToast(`Fechas bloqueadas: ${this.adminDiasSeleccionados.length} días en ${this.adminPropiedadSeleccionada.nombre}`);
    this.adminDiasSeleccionados = []; this.saveData();
  }

  adminMesAnterior() { this.adminMesActual = new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth() - 1, 1); this.adminDiasSeleccionados = []; }
  adminMesSiguiente() { this.adminMesActual = new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth() + 1, 1); this.adminDiasSeleccionados = []; }

  // ===== CHAT: lado ANFITRIÓN (panel admin) =====
  adminSeleccionarContacto(contacto: Contacto) { this.adminContactoActivo = contacto; contacto.noLeidos = 0; this.saveData(); }

  adminEnviarMensaje() {
    if (this.adminMensajeInput.trim()) {
      const horaActual = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
      this.adminContactoActivo.chat.push({ id: this.adminContactoActivo.chat.length + 1, texto: this.adminMensajeInput, enviado: true, hora: horaActual });
      this.adminContactoActivo.ultimo = this.adminMensajeInput;
      this.adminContactoActivo.tiempo = "ahora";
      this.adminContactoActivo.noLeidosViajero = (this.adminContactoActivo.noLeidosViajero || 0) + 1;
      if (this.adminContactoActivo.email === this.userEmail) {
        this.contactoClienteActivo = this.adminContactoActivo;
      }
      this.moverContactoArriba(this.adminContactoActivo);
      this.adminMensajeInput = "";
      this.saveData();
    }
  }

  // ===== CHAT: hilo compartido cliente/anfitrión =====
  // Reutilizado por handleSendMessage() y handleReservation() para que contactar
  // y reservar terminen en el MISMO hilo (por email + propiedad) en vez de crear
  // contactos sueltos cada vez.
  private obtenerOCrearContacto(property: Property): Contacto {
    let contacto = this.adminContactos.find(c => c.email === this.userEmail && c.propiedadId === property.id);
    if (!contacto) {
      contacto = {
        id: Date.now(),
        nombre: this.userName || 'Viajero',
        email: this.userEmail,
        ultimo: '',
        tiempo: 'ahora',
        noLeidos: 0,
        noLeidosViajero: 0,
        propiedad: property.name,
        propiedadId: property.id,
        imagen: property.image,
        fechas: this.formattedSearchDates !== 'Agregar fechas' ? this.formattedSearchDates : 'Sin fechas',
        chat: []
      };
      this.adminContactos.unshift(contacto);
    }
    return contacto;
  }

  // ===== CHAT: lado VIAJERO (vista 'mensajes') =====
  goToMensajes() {
    this.isUserMenuOpen = false;
    if (!this.contactoClienteActivo || this.contactoClienteActivo.email !== this.userEmail) {
      this.contactoClienteActivo = this.misContactos[0] || null;
    }
    this.activeView = 'mensajes';
    window.scrollTo(0, 0);
  }

  clienteSeleccionarContacto(contacto: Contacto) {
    this.contactoClienteActivo = contacto;
    contacto.noLeidosViajero = 0;
    this.saveData();
  }

  clienteEnviarMensaje() {
    if (this.clienteMensajeInput.trim() && this.contactoClienteActivo) {
      const hora = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
      this.contactoClienteActivo.chat.push({ id: this.contactoClienteActivo.chat.length + 1, texto: this.clienteMensajeInput, enviado: false, hora });
      this.contactoClienteActivo.ultimo = this.clienteMensajeInput;
      this.contactoClienteActivo.tiempo = "ahora";
      this.contactoClienteActivo.noLeidos = (this.contactoClienteActivo.noLeidos || 0) + 1;
      this.adminContactoActivo = this.contactoClienteActivo;
      this.moverContactoArriba(this.contactoClienteActivo);
      this.adminNotificaciones.unshift({ id: Date.now(), titulo: 'Nuevo Mensaje', mensaje: `${this.userName || 'Viajero'}: "${this.clienteMensajeInput}"`, tiempo: 'ahora', leida: false });
      this.clienteMensajeInput = "";
      this.saveData();
    }
  }

  get month1Title() { return `${this.monthNames[this.baseMonth.getMonth()]} ${this.baseMonth.getFullYear()}`; }
  get month2Title() {
    const d = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1, 1);
    return `${this.monthNames[d.getMonth()]} ${d.getFullYear()}`;
  }
  get month1Days() { return this.generateMonthDays(this.baseMonth.getFullYear(), this.baseMonth.getMonth()); }
  get month2Days() { return this.generateMonthDays(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1); }
  generateMonthDays(year: number, month: number) {
    const days = []; const firstDay = new Date(year, month, 1).getDay(); const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < adjustedFirstDay; i++) days.push(null);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }
  nextMonth() { this.baseMonth = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1, 1); }
  prevMonth() { this.baseMonth = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() - 1, 1); }

  selectDate(d: Date | null) {
    if (!d) return;
    if (!this.selDateIn || (this.selDateIn && this.selDateOut)) { this.selDateIn = d; this.selDateOut = null; }
    else if (d < this.selDateIn) this.selDateIn = d;
    else { this.selDateOut = d; setTimeout(() => this.activeSearchTab = null, 300); }
  }
  isDateSelected(d: Date | null) { return (this.selDateIn && d?.getTime() === this.selDateIn.getTime()) || (this.selDateOut && d?.getTime() === this.selDateOut.getTime()); }
  isDateInRange(d: Date | null) { return d && this.selDateIn && this.selDateOut && d > this.selDateIn && d < this.selDateOut; }
  formatDateShort(d: Date | null): string { return !d ? 'Agrega fechas' : d.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' }); }
  get formattedSearchDates() {
    if (!this.selDateIn || !this.selDateOut) return 'Agregar fechas';
    return `${this.selDateIn.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })} - ${this.selDateOut.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' })}`;
  }
  clearSearchDates() { this.selDateIn = null; this.selDateOut = null; }

  openSearchTab(tab: 'destino' | 'fechas' | 'huespedes') { this.activeSearchTab = this.activeSearchTab === tab ? null : tab; }
  handleSelectDestino(destino: string) { this.selectedDestino = destino; this.activeSearchTab = 'fechas'; }
  triggerSearch() { this.activeSearchTab = null; this.showToast(`Búsqueda aplicada: ${this.filteredProperties.length} propiedades`); }

  get filteredProperties() {
    return this.properties.filter(p => {
      const matchCategory = this.activeFilter === 'Todos' || p.type === this.activeFilter;
      const matchDestino = this.selectedDestino === '' || p.location.toLowerCase().includes(this.selectedDestino.toLowerCase().replace(', quito', ''));
      const matchCapacity = p.capacity >= (this.adults + this.children);
      const min = this.priceMin ? parseFloat(this.priceMin) : 0; const max = this.priceMax ? parseFloat(this.priceMax) : Infinity;
      const matchPrice = p.price >= min && p.price <= max;
      const matchAmenities = this.selectedAmenities.every(amenity => p.amenities.includes(amenity));
      return matchCategory && matchDestino && matchCapacity && matchPrice && matchAmenities;
    });
  }

  showToast(mensaje: string) {
    // El secreto aquí es usar 'window.' para forzar el temporizador del navegador
    if (this.toastTimeout) { window.clearTimeout(this.toastTimeout); }
    if (this.leaveTimeout) { window.clearTimeout(this.leaveTimeout); }

    this.toastMsg = mensaje;
    this.toastState = 'visible';

    this.toastTimeout = window.setTimeout(() => {
      this.toastState = 'leaving';

      this.leaveTimeout = window.setTimeout(() => {
        this.toastMsg = null;
        this.toastState = null;
      }, 300);
    }, 3000);
  }

  private getFavoriteKey(property: Property): string {
    return this.getPropertyKey(property);
  }

  private normalizeFavoriteKey(fav: any): string | null {
    if (typeof fav === 'string' && fav.includes('|')) {
      const [, name, location] = fav.split('|');
      const property = this.properties.find(p => p.name === name && p.location === location);
      return property ? this.getFavoriteKey(property) : null;
    }

    const propertyId = Number(fav);
    const property = this.properties.find(p => p.id === propertyId);
    return property ? this.getFavoriteKey(property) : null;
  }

  isFavorite(property: Property): boolean {
    return this.favorites.includes(this.getFavoriteKey(property));
  }

  toggleFavorite(event: Event, property: Property) {
    event.stopPropagation();
    if (!this.isLoggedIn) {
      this.openAuthModal('login');
      this.showToast('Inicia sesión para guardar favoritos');
      return;
    }

    const favoriteKey = this.getFavoriteKey(property);
    if (this.favorites.includes(favoriteKey)) {
      this.favorites = this.favorites.filter(key => key !== favoriteKey);
      this.showToast('Eliminado de favoritos');
    } else {
      this.favorites.push(favoriteKey);
      this.showToast('Añadido a favoritos');
    }
    this.saveData();
  }

  handlePropertyClick(property: Property) {
    this.selectedProperty = property;
    this.activeView = 'detalle';
    window.scrollTo(0, 0);
  }

  handleBackToCatalog() {
    this.activeView = 'catalogo';
    this.selectedProperty = null;
    this.isDetailCalendarOpen = false;
    this.isDetailGuestOpen = false;
  }

  openAuthModal(mode: 'login' | 'register') { this.authMode = mode; this.isAuthModalOpen = true; }

  handleAuth() {
    if (this.authMode === 'register') {
      if (!this.authName || !this.authEmail || !this.authPassword) {
        this.showToast('Por favor completa todos los campos.'); return;
      }
      if (!this.authEmail.includes('@')) {
        this.showToast('Ingresa un correo electrónico válido.'); return;
      }
      if (this.authPassword.length < 6) {
        this.showToast('La contraseña debe tener al menos 6 caracteres.'); return;
      }
    } else {
      if (!this.authEmail || !this.authPassword) {
        this.showToast('Ingresa tus credenciales para continuar.'); return;
      }
      if (!this.authEmail.includes('@')) {
        this.showToast('Ingresa un correo electrónico válido.'); return;
      }
    }

    this.isLoggedIn = true;
    this.userName = this.authMode === 'login' ? (this.authEmail.split('@')[0] || 'José') : this.authName;
    this.userEmail = this.authEmail;
    this.showToast(this.authMode === 'login' ? 'Sesión iniciada con éxito' : 'Cuenta creada con éxito');
    this.isAuthModalOpen = false;
    this.authEmail = ''; this.authPassword = ''; this.authName = '';
    this.saveData();
  }

  logout() {
    this.isLoggedIn = false;
    this.userName = '';
    this.userEmail = '';
    this.userPhone = '';
    this.favorites = [];
    this.contactoClienteActivo = null;
    this.isUserMenuOpen = false;
    this.activeView = 'catalogo';
    this.showToast('Sesión cerrada exitosamente');
    this.saveData();
  }

  goToConfiguracion() {
    this.isUserMenuOpen = false;
    this.configTab = 'info';
    this.activeView = 'configuracion';
    window.scrollTo(0, 0);
  }

  saveConfig() {
    this.saveData();
    this.showToast('Configuración guardada correctamente');
  }

  savePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.showToast('Por favor completa todos los campos de contraseña.');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.showToast('Las contraseñas nuevas no coinciden.');
      return;
    }
    if (this.newPassword.length < 6) {
      this.showToast('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    this.showToast('Contraseña actualizada con éxito');
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  get dynamicNights() {
    if (!this.selDateIn || !this.selDateOut) return 1;
    const diffDays = Math.ceil((this.selDateOut.getTime() - this.selDateIn.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }
  get subtotal() { return this.selectedProperty ? this.selectedProperty.price * this.dynamicNights : 0; }
  get serviceFee() { return Math.round(this.subtotal * 0.12); }
  get total() { return this.subtotal + this.serviceFee; }

  formatIsoDate(d: Date | null): string {
    return !d ? 'Añadir fecha' : d.toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  handleReservation() {
    if (!this.isLoggedIn) { this.openAuthModal('login'); this.showToast('Inicia sesión para solicitar una reserva'); return; }
    if (!this.selDateIn || !this.selDateOut || !this.selectedProperty) { this.showToast('Por favor selecciona las fechas de viaje'); return; }

    // Guardamos referencias locales ya validadas (evita perder el narrowing de TS)
    const property = this.selectedProperty;
    const checkIn = this.selDateIn;
    const checkOut = this.selDateOut;

    // 1. Guardar la reserva para la vista del viajero
    this.reservasBase.push({
      id: Date.now(),
      propiedadId: property.id,
      nombrePropiedad: property.name,
      ubicacionPropiedad: property.location,
      imagenPropiedad: property.image,
      propiedadKey: this.getPropertyKey(property),
      huesped: this.userName || 'Viajero',
      fechaCheckIn: checkIn,
      fechaCheckOut: checkOut,
      estado: 'Reserva con éxito'
    });

    // 2. Bloquear los días en el calendario del administrador
    this.bloquearFechasReserva(property, checkIn, checkOut);
    property.estado = 'Ocupado';

    // 3. Crear la notificación
    this.adminNotificaciones.unshift({
      id: Date.now(),
      titulo: '¡Nueva Reserva!',
      mensaje: `Reserva automática en ${property.name}`,
      tiempo: 'ahora',
      leida: false
    });

    // 4. Crear o continuar el chat con contexto de la reserva.
    const contacto = this.obtenerOCrearContacto(property);
    const horaActual = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
    const mensajeReserva = `Hola, solicité una reserva del ${this.formatIsoDate(checkIn)} al ${this.formatIsoDate(checkOut)} para ${property.name}.`;
    const mensajeConfirmacion = `¡Reserva confirmada! Del ${this.formatIsoDate(checkIn)} al ${this.formatIsoDate(checkOut)}. Cualquier duda, escríbeme por aquí.`;
    contacto.fechas = this.formattedSearchDates;
    contacto.chat.push({ id: contacto.chat.length + 1, texto: mensajeReserva, enviado: false, hora: horaActual });
    contacto.chat.push({ id: contacto.chat.length + 1, texto: mensajeConfirmacion, enviado: true, hora: horaActual });
    contacto.ultimo = mensajeConfirmacion;
    contacto.tiempo = 'ahora';
    contacto.noLeidos = (contacto.noLeidos || 0) + 1;
    contacto.noLeidosViajero = (contacto.noLeidosViajero || 0) + 1;
    this.adminContactoActivo = contacto;
    this.contactoClienteActivo = contacto;
    this.moverContactoArriba(contacto);

    // 5. Finalizar visualmente
    this.showToast('¡Reserva confirmada con éxito!');
    this.clearSearchDates();
    this.isDetailCalendarOpen = false;
    this.isDetailGuestOpen = false;
    this.saveData();

    setTimeout(() => this.handleBackToCatalog(), 1500);
  }

  clearAllFilters() { this.activeFilter = 'Todos'; this.selectedDestino = ''; this.priceMin = ''; this.priceMax = ''; this.selectedAmenities = []; this.adults = 2; this.children = 0; this.clearSearchDates(); this.showToast('Filtros limpiados'); }

  handleSendMessage() {
    if (!this.isLoggedIn) { this.openAuthModal('login'); this.isContactModalOpen = false; this.showToast('Inicia sesión para contactar al anfitrión'); return; }
    if (!this.contactMessage.trim() || !this.selectedProperty) return;

    const property = this.selectedProperty;
    const contacto = this.obtenerOCrearContacto(property);
    const hora = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

    contacto.chat.push({ id: contacto.chat.length + 1, texto: this.contactMessage, enviado: false, hora });
    contacto.ultimo = this.contactMessage;
    contacto.tiempo = 'ahora';
    contacto.noLeidos = (contacto.noLeidos || 0) + 1;
    this.adminContactoActivo = contacto;
    this.contactoClienteActivo = contacto;
    this.moverContactoArriba(contacto);

    this.adminNotificaciones.unshift({ id: Date.now(), titulo: 'Nuevo Mensaje', mensaje: `${this.userName || 'Viajero'}: "${this.contactMessage}"`, tiempo: 'ahora', leida: false });
    this.showToast('Mensaje enviado al anfitrión');
    this.contactMessage = ''; this.isContactModalOpen = false; this.saveData();
  }

  toggleAmenity(amenity: string) {
    if (this.selectedAmenities.includes(amenity)) this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
    else this.selectedAmenities.push(amenity);
  }

  handleApplyFilters() { this.isFiltrosOpen = false; this.showToast(`Filtros aplicados: ${this.filteredProperties.length} resultados`); }
  updateAdults(amount: number, event: Event) { event.stopPropagation(); this.adults = Math.max(1, this.adults + amount); }
  updateChildren(amount: number, event: Event) { event.stopPropagation(); this.children = Math.max(0, this.children + amount); }

  get favoritePropertiesList() {
    return this.favorites
      .map(key => {
        const [idRaw, name, location] = key.split('|');
        const id = Number(idRaw);
        return this.properties.find(p => p.id === id && p.name === name && p.location === location)
          || this.properties.find(p => p.name === name && p.location === location);
      })
      .filter((property): property is Property => !!property);
  }
  goToFavoritos() { this.isUserMenuOpen = false; this.activeView = 'favoritos'; window.scrollTo(0, 0); }
  get misViajesList() { return this.reservasBase.filter(r => r.huesped === this.userName); }
  getReservationImage(viaje: Reserva): string {
    const prop = this.findPropertyForReservation(viaje);
    return viaje.imagenPropiedad || prop?.image || '';
  }
  getPropertyImage(id: number, nombrePropiedad?: string): string {
    const prop = this.properties.find(p => p.id === id && (!nombrePropiedad || p.name === nombrePropiedad))
      || this.properties.find(p => nombrePropiedad && p.name === nombrePropiedad)
      || this.properties.find(p => p.id === id);
    return prop ? prop.image : '';
  }
  goToMisViajes() { this.isUserMenuOpen = false; this.activeView = 'mis-viajes'; window.scrollTo(0, 0); }
}
