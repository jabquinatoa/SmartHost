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
  huesped: string;
  fechaCheckIn: Date;
  fechaCheckOut: Date;
  estado: 'Check-in' | 'Check-out' | 'Pendiente';
}

interface TareaLimpieza {
  id: number;
  propiedad: string;
  descripcion: string;
  asignado: string;
  completada: boolean;
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
  ultimo: string;
  tiempo: string;
  noLeidos: number;
  propiedad: string;
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
    { id: 1, propiedad: 'Suite Ejecutiva con Vista al Pichincha', descripcion: 'Limpieza profunda', asignado: 'María', completada: false },
    { id: 2, propiedad: 'Loft Moderno Parque La Carolina', descripcion: 'Reposición sábanas', asignado: 'Juan', completada: false }
  ];

  activeView: 'catalogo' | 'detalle' | 'admin' | 'favoritos' | 'mis-viajes' = 'catalogo';
  selectedProperty: Property | null = null;
  toastMsg: string | null = null;
  
  activeFilter = 'Todos';
  favorites: number[] = [];
  activeSearchTab: 'destino' | 'fechas' | 'huespedes' | null = null;
  selectedDestino = '';
  selDateIn: Date | null = null;
  selDateOut: Date | null = null;
  adults = 2;
  children = 0;

  baseMonth = new Date();
  monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  
  // Modales de la Tarjeta de Reserva
  isDetailCalendarOpen = false;
  isDetailGuestOpen = false;

  isContactModalOpen = false;
  isFiltrosOpen = false;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  priceMin = '';
  priceMax = '';
  selectedAmenities: string[] = [];
  isAuthModalOpen = false;
  authMode: 'login' | 'register' = 'login';
  authEmail = '';
  authPassword = '';
  authName = '';
  isLoggedIn = false;
  userName = '';
  contactMessage = '';

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

  propiedadesCalendario = [
    { id: 1, nombre: "Loft Moderno Parque La Carolina", diasOcupados: [3, 4, 5, 12, 13, 14, 15, 22, 23] },
    { id: 2, nombre: "Casa Patrimonial Restaurada", diasOcupados: [1, 2, 8, 9, 10, 18, 19, 28, 29, 30] },
    { id: 3, nombre: "Suite Ejecutiva con Vista al Pichincha", diasOcupados: [5, 6, 7, 15, 16, 17, 25, 26] },
  ];
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
    { id: 1, nombre: "Carlos Martinez", ultimo: "Gracias por la info!", tiempo: "10:40", noLeidos: 2, propiedad: "Loft Moderno Parque La Carolina", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop", fechas: "15-18 Ene 2026", chat: [] }
  ];
  adminContactoActivo = this.adminContactos[0];
  
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

  ngOnInit() { this.loadData(); }

  loadData() {
    const savedData = localStorage.getItem('smartHostDB');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.properties) {
          // Hidratación: Asegurar que todas las propiedades tengan un arreglo de imágenes válido
          this.properties = parsed.properties.map((p: Property) => {
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
        if (parsed.favorites) this.favorites = parsed.favorites;
        if (parsed.reservasBase) {
          this.reservasBase = parsed.reservasBase.map((r: any) => ({
            ...r,
            fechaCheckIn: new Date(r.fechaCheckIn),
            fechaCheckOut: new Date(r.fechaCheckOut)
          }));
        }
        if (parsed.tareasLimpieza) this.tareasLimpieza = parsed.tareasLimpieza;
        if (parsed.propiedadesCalendario) this.propiedadesCalendario = parsed.propiedadesCalendario;
        if (parsed.isLoggedIn !== undefined) this.isLoggedIn = parsed.isLoggedIn;
        if (parsed.userName) this.userName = parsed.userName;
        if (parsed.adminNotificaciones) this.adminNotificaciones = parsed.adminNotificaciones;
        
        if (parsed.adminContactos) {
          this.adminContactos = parsed.adminContactos.map((c: any) => {
            if (!c.chat) c.chat = [{ id: 1, texto: c.ultimo, enviado: false, hora: c.tiempo }];
            return c;
          });
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
    if (tarea.completada) this.showToast(`Limpieza de ${tarea.propiedad} completada`);
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
        if(this.adminPropertyForm.imagen) this.properties[index].image = this.adminPropertyForm.imagen;
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

  adminSeleccionarContacto(contacto: Contacto) { this.adminContactoActivo = contacto; contacto.noLeidos = 0; this.saveData(); }
  adminEnviarMensaje() {
    if (this.adminMensajeInput.trim()) {
      const horaActual = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
      this.adminContactoActivo.chat.push({ id: this.adminContactoActivo.chat.length + 1, texto: this.adminMensajeInput, enviado: true, hora: horaActual });
      this.adminContactoActivo.ultimo = this.adminMensajeInput; this.adminContactoActivo.tiempo = "ahora"; this.adminMensajeInput = "";
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

  showToast(message: string) { this.toastMsg = message; setTimeout(() => this.toastMsg = null, 3000); }
  
  toggleFavorite(event: Event, propertyId: number) {
    event.stopPropagation();
    if (this.favorites.includes(propertyId)) { this.favorites = this.favorites.filter(id => id !== propertyId); this.showToast('Eliminado de favoritos'); }
    else { this.favorites.push(propertyId); this.showToast('Añadido a favoritos'); }
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
    this.isLoggedIn = true; this.userName = this.authMode === 'login' ? 'José' : (this.authName || 'Usuario');
    this.showToast(this.authMode === 'login' ? 'Sesión iniciada con éxito' : 'Cuenta creada con éxito');
    this.isAuthModalOpen = false; this.authEmail = ''; this.authPassword = ''; this.authName = ''; this.saveData();
  }
  logout() { this.isLoggedIn = false; this.userName = ''; this.isUserMenuOpen = false; this.showToast('Sesión cerrada'); this.saveData(); }
  showWipToast() { this.isUserMenuOpen = false; this.showToast('Esta función está en construcción 🚧'); }

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
    if (!this.selDateIn || !this.selDateOut || !this.selectedProperty) { this.showToast('Por favor selecciona las fechas de tu reserva'); return; }
    
    this.reservasBase.push({ 
      id: Date.now(), 
      propiedadId: this.selectedProperty.id, 
      nombrePropiedad: this.selectedProperty.name, 
      huesped: this.userName || 'Viajero', 
      fechaCheckIn: this.selDateIn, 
      fechaCheckOut: this.selDateOut, 
      estado: 'Pendiente' 
    });
    
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
    if (this.contactMessage.trim()) {
      const nuevoContacto: Contacto = {
        id: Date.now(), nombre: this.userName || 'Viajero Nuevo', ultimo: this.contactMessage, tiempo: "ahora", noLeidos: 1, propiedad: this.selectedProperty?.name || 'Consulta General',
        imagen: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop', fechas: this.formattedSearchDates !== 'Agregar fechas' ? this.formattedSearchDates : 'Sin fechas',
        chat: [{ id: 1, texto: this.contactMessage, enviado: false, hora: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) }]
      };
      this.adminContactos.unshift(nuevoContacto);
      this.adminNotificaciones.unshift({ id: Date.now(), titulo: 'Nuevo Mensaje', mensaje: `${this.userName || 'Viajero'}: "${this.contactMessage}"`, tiempo: 'ahora', leida: false });
      this.showToast('Mensaje enviado al anfitrión');
      this.contactMessage = ''; this.isContactModalOpen = false; this.saveData();
    }
  }

  toggleAmenity(amenity: string) {
    if (this.selectedAmenities.includes(amenity)) this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
    else this.selectedAmenities.push(amenity);
  }

  handleApplyFilters() { this.isFiltrosOpen = false; this.showToast(`Filtros aplicados: ${this.filteredProperties.length} resultados`); }
  updateAdults(amount: number, event: Event) { event.stopPropagation(); this.adults = Math.max(1, this.adults + amount); }
  updateChildren(amount: number, event: Event) { event.stopPropagation(); this.children = Math.max(0, this.children + amount); }

  get favoritePropertiesList() { return this.properties.filter(p => this.favorites.includes(p.id)); }
  goToFavoritos() { this.isUserMenuOpen = false; this.activeView = 'favoritos'; window.scrollTo(0, 0); }
  get misViajesList() { return this.reservasBase.filter(r => r.huesped === this.userName); }
  getPropertyImage(id: number): string { const prop = this.properties.find(p => p.id === id); return prop ? prop.image : ''; }
  goToMisViajes() { this.isUserMenuOpen = false; this.activeView = 'mis-viajes'; window.scrollTo(0, 0); }
}