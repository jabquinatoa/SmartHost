import { Component } from '@angular/core';
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
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.html'
})
export class CatalogoComponent {
  // Estados de Vista
  activeView: 'catalogo' | 'detalle' | 'admin' = 'catalogo';
  selectedProperty: Property | null = null;
  toastMsg: string | null = null;
  
  // Variables del Catálogo
  activeFilter = 'Todos';
  favorites: number[] = [];
  activeSearchTab: 'destino' | 'fechas' | 'huespedes' | null = null;
  selectedDestino = '';
  selDateIn: Date | null = null;
  selDateOut: Date | null = null;
  adults = 2;
  children = 0;

  // Variables Generales Catálogo
  baseMonth = new Date();
  monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  resDateIn = '';
  resDateOut = '';
  resInputTypeIn = 'text';
  resInputTypeOut = 'text';
  isContactModalOpen = false;
  isFiltrosOpen = false;
  isUserMenuOpen = false;
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
    { city: 'Quito Norte', neighborhoods: ['La Carolina', 'González Suárez', 'Bellavista', 'Ponceano'] },
    { city: 'Quito Centro', neighborhoods: ['Centro Histórico', 'La Mariscal', 'San Juan'] },
    { city: 'Quito Sur', neighborhoods: ['Quitumbe', 'Solanda', 'Villa Flora'] },
    { city: 'Valles', neighborhoods: ['Cumbayá', 'Tumbaco', 'Sangolquí'] },
  ];

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
      description: 'Hermoso loft completamente amueblado a pasos del Parque La Carolina y centros comerciales.',
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
      description: 'Encantadora casa colonial con patio central en el corazón del Centro Histórico.',
    },
    {
      id: 3,
      name: 'Suite Ejecutiva con Vista al Pichincha',
      location: 'González Suárez, Quito Norte',
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
      description: 'Suite de lujo con acabados de primera calidad y balcón con vista directa al volcán.',
    }
  ];

  // ================== VARIABLES MODO ADMINISTRADOR ==================
  adminView: 'inicio' | 'propiedades' | 'mensajes' | 'calendario' = 'inicio';
  isAdminSidebarOpen = true;

  // ---- Calendario Admin ----
  propiedadesCalendario = [
    { id: 1, nombre: "Loft Cumbaya", diasOcupados: [3, 4, 5, 12, 13, 14, 15, 22, 23] },
    { id: 2, nombre: "Suite Carolina", diasOcupados: [1, 2, 8, 9, 10, 18, 19, 28, 29, 30] },
    { id: 3, nombre: "Depto. La Floresta", diasOcupados: [5, 6, 7, 15, 16, 17, 25, 26] },
    { id: 4, nombre: "Estudio Gonzalez Suarez", diasOcupados: [10, 11, 12, 20, 21, 22, 23] },
  ];
  adminMesActual: Date = new Date();
  adminDiasSeleccionados: number[] = [];
  adminPropiedadSeleccionadaId: number = 1;
  adminDiasSemana = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

  // ---- Propiedades Admin ----
  adminPropiedadesFiltro: string = "Todos";
  adminPropiedadesList = [
    { id: 1, nombre: "Loft Centro Historico", estado: "Libre", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", precio: "$85/noche" },
    { id: 2, nombre: "Departamento Playa", estado: "Ocupado", imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", precio: "$120/noche" },
    { id: 3, nombre: "Suite Ejecutiva", estado: "Mantenimiento", imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", precio: "$95/noche" },
    { id: 4, nombre: "Estudio Moderno", estado: "Libre", imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", precio: "$65/noche" },
    { id: 5, nombre: "Penthouse Vista Mar", estado: "Ocupado", imagen: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop", precio: "$200/noche" },
    { id: 6, nombre: "Apartamento Familiar", estado: "Libre", imagen: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop", precio: "$110/noche" },
  ];

  get adminPropiedadesFiltradas() {
    if (this.adminPropiedadesFiltro === "Todos") return this.adminPropiedadesList;
    return this.adminPropiedadesList.filter(p => p.estado === this.adminPropiedadesFiltro);
  }

  // ---- Mensajes Admin ----
  adminMensajesTab: 'chats' | 'resenas' = 'chats';
  adminMensajesBusqueda: string = "";
  adminMensajeInput: string = "";
  
  adminContactos = [
    { id: 1, nombre: "Carlos Martinez", ultimo: "Gracias por la informacion!", tiempo: "hace 5 min", noLeidos: 2, propiedad: "Loft Centro", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop", fechas: "15-18 Ene 2026" },
    { id: 2, nombre: "Ana Garcia", ultimo: "A que hora es el check-in?", tiempo: "hace 30 min", noLeidos: 0, propiedad: "Suite Ejecutiva", imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop", fechas: "20-25 Ene 2026" },
    { id: 3, nombre: "Pedro Ruiz", ultimo: "Perfecto, nos vemos manana", tiempo: "hace 1 hora", noLeidos: 0, propiedad: "Estudio Moderno", imagen: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=200&fit=crop", fechas: "10-12 Ene 2026" },
    { id: 4, nombre: "Maria Lopez", ultimo: "Hay estacionamiento disponible?", tiempo: "hace 2 horas", noLeidos: 1, propiedad: "Depto. Playa", imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop", fechas: "22-28 Ene 2026" },
    { id: 5, nombre: "Juan Torres", ultimo: "Muchas gracias!", tiempo: "ayer", noLeidos: 0, propiedad: "Loft Centro", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop", fechas: "5-8 Ene 2026" },
  ];

  adminContactoActivo = this.adminContactos[0];

  adminMensajesChat = [
    { id: 1, texto: "Hola! Tengo una reserva para este fin de semana.", enviado: false, hora: "10:30" },
    { id: 2, texto: "Hola Carlos! Si, ya tenemos tu reserva confirmada para el Loft Centro.", enviado: true, hora: "10:32" },
    { id: 3, texto: "Perfecto! A que hora puedo hacer el check-in?", enviado: false, hora: "10:35" },
    { id: 4, texto: "El check-in es a partir de las 14:00. Te enviaremos las instrucciones de acceso por la manana.", enviado: true, hora: "10:38" },
    { id: 5, texto: "Gracias por la informacion!", enviado: false, hora: "10:40" },
    { id: 6, texto: "Hay alguna recomendacion de restaurantes cercanos?", enviado: false, hora: "10:45" },
    { id: 7, texto: "Claro! Hay varios excelentes. Te recomiendo 'La Terraza' a 2 cuadras, tienen comida increible.", enviado: true, hora: "10:48" },
    { id: 8, texto: "Genial, lo anotare. Gracias!", enviado: false, hora: "10:50" },
  ];

  adminResenas = [
    { id: 1, nombre: "Laura Mendez", propiedad: "Loft Centro", rating: 5, texto: "Excelente ubicacion y muy limpio. Volveria sin duda!", fecha: "hace 2 dias" },
    { id: 2, nombre: "Roberto Diaz", propiedad: "Suite Ejecutiva", rating: 4, texto: "Muy comodo para viajes de trabajo. Solo falta mejor WiFi.", fecha: "hace 1 semana" },
    { id: 3, nombre: "Carmen Ruiz", propiedad: "Depto. Playa", rating: 5, texto: "Vista increible! La playa a 2 minutos. Perfecto.", fecha: "hace 2 semanas" },
  ];

  get adminContactosFiltrados() {
    return this.adminContactos.filter(c => c.nombre.toLowerCase().includes(this.adminMensajesBusqueda.toLowerCase()));
  }

  adminSeleccionarContacto(contacto: any) {
    this.adminContactoActivo = contacto;
  }

  adminEnviarMensaje() {
    if (this.adminMensajeInput.trim()) {
      this.adminMensajesChat.push({
        id: this.adminMensajesChat.length + 1,
        texto: this.adminMensajeInput,
        enviado: true,
        hora: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
      });
      this.adminMensajeInput = "";
      this.showToast("Mensaje enviado correctamente");
    }
  }


  // ================== LÓGICA DE CALENDARIO VIAJERO ==================
  get month1Title() { return `${this.monthNames[this.baseMonth.getMonth()]} ${this.baseMonth.getFullYear()}`; }
  get month2Title() {
    const d = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1, 1);
    return `${this.monthNames[d.getMonth()]} ${d.getFullYear()}`;
  }
  get month1Days() { return this.generateMonthDays(this.baseMonth.getFullYear(), this.baseMonth.getMonth()); }
  get month2Days() { return this.generateMonthDays(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1); }

  generateMonthDays(year: number, month: number) {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < adjustedFirstDay; i++) days.push(null);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }

  nextMonth() { this.baseMonth = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1, 1); }
  prevMonth() { this.baseMonth = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() - 1, 1); }

  selectDate(d: Date | null) {
    if (!d) return;
    if (!this.selDateIn || (this.selDateIn && this.selDateOut)) {
      this.selDateIn = d;
      this.selDateOut = null;
    } else if (d < this.selDateIn) {
      this.selDateIn = d;
    } else {
      this.selDateOut = d;
      setTimeout(() => this.activeSearchTab = null, 300);
    }
  }

  isDateSelected(d: Date | null) {
    if (!d) return false;
    return (this.selDateIn && d.getTime() === this.selDateIn.getTime()) ||
           (this.selDateOut && d.getTime() === this.selDateOut.getTime());
  }

  isDateInRange(d: Date | null) {
    if (!d || !this.selDateIn || !this.selDateOut) return false;
    return d > this.selDateIn && d < this.selDateOut;
  }

  formatDateShort(d: Date | null): string {
    if (!d) return 'Agrega fechas';
    return d.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' });
  }

  get formattedSearchDates() {
    if (!this.selDateIn || !this.selDateOut) return 'Agregar fechas';
    const inStr = this.selDateIn.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' });
    const outStr = this.selDateOut.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' });
    return `${inStr} - ${outStr}`;
  }

  clearSearchDates() {
    this.selDateIn = null;
    this.selDateOut = null;
  }

  // ================== CONTROL DE BÚSQUEDA Y FILTROS ==================
  openSearchTab(tab: 'destino' | 'fechas' | 'huespedes') {
    this.activeSearchTab = this.activeSearchTab === tab ? null : tab;
  }

  handleSelectDestino(destino: string) {
    this.selectedDestino = destino;
    this.activeSearchTab = 'fechas'; 
  }

  triggerSearch() {
    this.activeSearchTab = null;
    this.showToast(`Búsqueda aplicada: ${this.filteredProperties.length} propiedades`);
  }

  get filteredProperties() {
    return this.properties.filter(p => {
      const matchCategory = this.activeFilter === 'Todos' || p.type === this.activeFilter;
      const matchDestino = this.selectedDestino === '' || p.location.toLowerCase().includes(this.selectedDestino.toLowerCase().replace(', quito', ''));
      const totalGuests = this.adults + this.children;
      const matchCapacity = p.capacity >= totalGuests;
      const min = this.priceMin ? parseFloat(this.priceMin) : 0;
      const max = this.priceMax ? parseFloat(this.priceMax) : Infinity;
      const matchPrice = p.price >= min && p.price <= max;
      const matchAmenities = this.selectedAmenities.every(amenity => p.amenities.includes(amenity));
      return matchCategory && matchDestino && matchCapacity && matchPrice && matchAmenities;
    });
  }

  // ================== UTILIDADES GENERALES ==================
  showToast(message: string) {
    this.toastMsg = message;
    setTimeout(() => this.toastMsg = null, 3000);
  }

  toggleFavorite(event: Event, propertyId: number) {
    event.stopPropagation();
    if (this.favorites.includes(propertyId)) {
      this.favorites = this.favorites.filter(id => id !== propertyId);
      this.showToast('Eliminado de favoritos');
    } else {
      this.favorites.push(propertyId);
      this.showToast('Añadido a favoritos');
    }
  }

  handlePropertyClick(property: Property) {
    this.selectedProperty = property;
    this.activeView = 'detalle';
    window.scrollTo(0, 0);
  }

  handleBackToCatalog() {
    this.activeView = 'catalogo';
    this.selectedProperty = null;
  }

  openAuthModal(mode: 'login' | 'register') {
    this.authMode = mode;
    this.isAuthModalOpen = true;
  }

  handleAuth() {
    this.isLoggedIn = true;
    this.userName = this.authMode === 'login' ? 'José' : (this.authName || 'Usuario');
    this.showToast(this.authMode === 'login' ? 'Sesión iniciada con éxito' : 'Cuenta creada con éxito');
    this.isAuthModalOpen = false;
    this.authEmail = ''; this.authPassword = ''; this.authName = '';
  }

  logout() {
    this.isLoggedIn = false;
    this.userName = '';
    this.isUserMenuOpen = false;
    this.showToast('Sesión cerrada');
  }

  showWipToast() {
    this.isUserMenuOpen = false;
    this.showToast('Esta función está en construcción 🚧');
  }

  // ================== FUNCIONES DEL ADMINISTRADOR ==================
  goToAdminPanel() {
    this.isUserMenuOpen = false;
    this.showToast('Preparando tu panel de anfitrión...');
    setTimeout(() => {
      this.activeView = 'admin';
      this.adminView = 'inicio';
      window.scrollTo(0, 0);
    }, 100); 
  }

  exitAdminPanel() {
    this.activeView = 'catalogo';
    this.showToast('Volviendo al modo viaje...');
  }

  setAdminView(view: 'inicio' | 'propiedades' | 'mensajes' | 'calendario') {
    this.adminView = view;
    if (window.innerWidth < 1024) this.isAdminSidebarOpen = false;
  }

  get adminViewTitle() {
    switch (this.adminView) {
      case 'inicio': return 'Resumen Operativo';
      case 'propiedades': return 'Mis Propiedades';
      case 'mensajes': return 'Centro de Mensajes';
      case 'calendario': return 'Calendario de Reservas';
      default: return 'Panel de Control';
    }
  }

  // ---- Lógica del Calendario Admin ----
  get adminPropiedadSeleccionada() {
    return this.propiedadesCalendario.find(p => p.id === this.adminPropiedadSeleccionadaId) || this.propiedadesCalendario[0];
  }

  get adminNombreMes() {
    return this.adminMesActual.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  }

  get adminDiasEnMes() {
    return new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth() + 1, 0).getDate();
  }

  get adminDiaSemanaInicio() {
    return new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth(), 1).getDay();
  }

  get adminEmptyDays() {
    return Array(this.adminDiaSemanaInicio).fill(null);
  }

  get adminDaysArray() {
    return Array.from({ length: this.adminDiasEnMes }, (_, i) => i + 1);
  }

  get adminOcupacionPorcentaje() {
    return Math.round((this.adminPropiedadSeleccionada.diasOcupados.length / this.adminDiasEnMes) * 100);
  }

  adminHandlePropiedadChange(event: any) {
    this.adminPropiedadSeleccionadaId = Number(event.target.value);
    this.adminDiasSeleccionados = [];
  }

  adminToggleDia(dia: number) {
    if (this.adminPropiedadSeleccionada.diasOcupados.includes(dia)) return;
    const index = this.adminDiasSeleccionados.indexOf(dia);
    if (index > -1) {
      this.adminDiasSeleccionados.splice(index, 1);
    } else {
      this.adminDiasSeleccionados.push(dia);
    }
  }

  adminBloquearFechas() {
    if (this.adminDiasSeleccionados.length === 0) {
      this.showToast("Selecciona al menos un dia para bloquear");
      return;
    }
    this.showToast(`Fechas bloqueadas: ${this.adminDiasSeleccionados.length} días en ${this.adminPropiedadSeleccionada.nombre}`);
    this.adminDiasSeleccionados = [];
  }

  adminMesAnterior() {
    this.adminMesActual = new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth() - 1, 1);
    this.adminDiasSeleccionados = [];
  }

  adminMesSiguiente() {
    this.adminMesActual = new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth() + 1, 1);
    this.adminDiasSeleccionados = [];
  }

  // ================== DETALLES Y RESERVAS ==================
  get dynamicNights() {
    if (!this.resDateIn || !this.resDateOut) return 1;
    const start = new Date(this.resDateIn).getTime();
    const end = new Date(this.resDateOut).getTime();
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }

  get subtotal() { return this.selectedProperty ? this.selectedProperty.price * this.dynamicNights : 0; }
  get serviceFee() { return Math.round(this.subtotal * 0.12); }
  get total() { return this.subtotal + this.serviceFee; }

  formatIsoDate(dateStr: string): string {
    if (!dateStr) return 'Añadir fecha';
    const date = new Date(dateStr + 'T12:00:00');
    return date.toLocaleDateString('es-EC', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  handleReservation() {
    if (!this.isLoggedIn) {
      this.openAuthModal('login');
      this.showToast('Inicia sesión para solicitar una reserva');
      return;
    }
    this.showToast('Solicitud de reserva enviada al anfitrión');
    this.resDateIn = ''; this.resDateOut = '';
    this.resInputTypeIn = 'text'; this.resInputTypeOut = 'text';
  }

  clearAllFilters() {
    this.activeFilter = 'Todos'; this.selectedDestino = '';
    this.priceMin = ''; this.priceMax = ''; this.selectedAmenities = [];
    this.adults = 2; this.children = 0; this.clearSearchDates();
    this.showToast('Filtros limpiados');
  }

  handleSendMessage() {
    if (!this.isLoggedIn) {
      this.openAuthModal('login');
      this.isContactModalOpen = false;
      this.showToast('Inicia sesión para contactar al anfitrión');
      return;
    }
    if (this.contactMessage.trim()) {
      this.showToast('Mensaje enviado al anfitrión');
      this.contactMessage = ''; this.isContactModalOpen = false;
    }
  }

  toggleAmenity(amenity: string) {
    if (this.selectedAmenities.includes(amenity)) {
      this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
    } else {
      this.selectedAmenities.push(amenity);
    }
  }

  handleApplyFilters() {
    this.isFiltrosOpen = false;
    this.showToast(`Filtros extra aplicados: ${this.filteredProperties.length} resultados`);
  }

  updateAdults(amount: number, event: Event) {
    event.stopPropagation();
    this.adults = Math.max(1, this.adults + amount);
  }

  updateChildren(amount: number, event: Event) {
    event.stopPropagation();
    this.children = Math.max(0, this.children + amount);
  }
}