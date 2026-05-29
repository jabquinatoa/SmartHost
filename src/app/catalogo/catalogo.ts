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
  activeView: 'catalogo' | 'detalle' | 'admin' = 'catalogo';
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
      description: 'Hermoso loft completamente amueblado a pasos del Parque La Carolina y centros comerciales. Cuenta con todas las comodidades modernas, excelente ubicación cerca de restaurantes y estaciones del Metro de Quito. Ideal para negocios o turismo.',
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
      description: 'Encantadora casa colonial con patio central en el corazón del Centro Histórico mejor conservado de América. Arquitectura tradicional quiteña con interiores renovados y vista a las cúpulas de las iglesias.',
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
      description: 'Suite de lujo con acabados de primera calidad y balcón con vista directa al volcán Pichincha. Edificio inteligente con seguridad 24/7, gimnasio y terraza comunal. Perfecta para viajeros de negocios.',
    },
    {
      id: 4,
      name: 'Departamento Familiar Acogedor',
      location: 'Quitumbe, Quito Sur',
      price: 45,
      rating: 4.7,
      reviews: 156,
      type: 'Departamentos',
      capacity: 5,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      ],
      amenities: ['WiFi', 'Cocina', 'TV', 'Estacionamiento'],
      description: 'Amplio departamento familiar en sector residencial y tranquilo. Excelente conexión de transporte a pocos minutos de la Terminal Terrestre y paradas del metro. Cocina completamente equipada y áreas seguras.',
    },
    {
      id: 5,
      name: 'Quinta Vacacional con Piscina',
      location: 'Cumbayá, Valles',
      price: 120,
      rating: 4.9,
      reviews: 203,
      type: 'Casas',
      capacity: 8,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      ],
      amenities: ['WiFi', 'Cocina', 'Piscina', 'Estacionamiento', 'Mascotas'],
      description: 'Disfruta del clima cálido de Cumbayá en esta hermosa propiedad con áreas verdes, zona de BBQ y piscina temperada. El escape de fin de semana perfecto sin alejarte mucho de la ciudad.',
    },
    {
      id: 6,
      name: 'Suite Estilo Bohemio',
      location: 'La Mariscal, Quito Centro',
      price: 50,
      rating: 4.6,
      reviews: 92,
      type: 'Suites',
      capacity: 2,
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=800&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
      ],
      amenities: ['WiFi', 'Cocina', 'Mascotas'],
      description: 'Suite única decorada con arte local en el vibrante barrio de La Mariscal. A poca distancia de plazas, cafés culturales y la vida nocturna de la Plaza Foch. Ambiente tranquilo y acogedor.',
    }
  ];

  get month1Title() {
    return `${this.monthNames[this.baseMonth.getMonth()]} ${this.baseMonth.getFullYear()}`;
  }

  get month2Title() {
    const d = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1, 1);
    return `${this.monthNames[d.getMonth()]} ${d.getFullYear()}`;
  }

  get month1Days() {
    return this.generateMonthDays(this.baseMonth.getFullYear(), this.baseMonth.getMonth());
  }

  get month2Days() {
    return this.generateMonthDays(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1);
  }

  generateMonthDays(year: number, month: number) {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    for (let i = 0; i < adjustedFirstDay; i++) days.push(null);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }

  nextMonth() {
    this.baseMonth = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() + 1, 1);
  }

  prevMonth() {
    this.baseMonth = new Date(this.baseMonth.getFullYear(), this.baseMonth.getMonth() - 1, 1);
  }

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

  openSearchTab(tab: 'destino' | 'fechas' | 'huespedes') {
    this.activeSearchTab = this.activeSearchTab === tab ? null : tab;
  }

  handleSelectDestino(destino: string) {
    this.selectedDestino = destino;
    this.activeSearchTab = 'fechas'; 
  }

  triggerSearch() {
    this.activeSearchTab = null;
    const total = this.filteredProperties.length;
    this.showToast(`Búsqueda aplicada: ${total} propiedades`);
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
    if (this.authMode === 'login') {
      this.isLoggedIn = true;
      this.userName = 'José';
      this.showToast('Sesión iniciada con éxito');
    } else {
      this.isLoggedIn = true;
      this.userName = this.authName || 'Usuario';
      this.showToast('Cuenta creada con éxito');
    }
    this.isAuthModalOpen = false;
    this.authEmail = '';
    this.authPassword = '';
    this.authName = '';
  }

  logout() {
    this.isLoggedIn = false;
    this.userName = '';
    this.isUserMenuOpen = false;
    this.showToast('Sesión cerrada');
  }

  goToAdminPanel() {
    this.isUserMenuOpen = false;
    this.showToast('Preparando tu panel de anfitrión...');
    
    setTimeout(() => {
      this.activeView = 'admin';
      window.scrollTo(0, 0);
    }, 800);
  }

  showWipToast() {
    this.isUserMenuOpen = false;
    this.showToast('Esta función está en construcción 🚧');
  }

  handleReservation() {
    if (!this.isLoggedIn) {
      this.openAuthModal('login');
      this.showToast('Inicia sesión para solicitar una reserva');
      return;
    }
    this.showToast('Solicitud de reserva enviada al anfitrión');
    this.resDateIn = '';
    this.resDateOut = '';
    this.resInputTypeIn = 'text';
    this.resInputTypeOut = 'text';
  }

  clearAllFilters() {
    this.activeFilter = 'Todos';
    this.selectedDestino = '';
    this.priceMin = '';
    this.priceMax = '';
    this.selectedAmenities = [];
    this.adults = 2;
    this.children = 0;
    this.clearSearchDates();
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
      this.contactMessage = '';
      this.isContactModalOpen = false;
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
    const total = this.filteredProperties.length;
    this.showToast(`Filtros extra aplicados: ${total} resultados`);
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