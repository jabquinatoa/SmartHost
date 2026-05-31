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
      description: 'Hermoso loft completamente amueblado a pasos del Parque La Carolina y centros comerciales.',
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
      description: 'Encantadora casa colonial con patio central en el corazón del Centro Histórico.',
      estado: 'Ocupado'
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
      estado: 'Mantenimiento'
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

  adminView: 'inicio' | 'propiedades' | 'mensajes' | 'calendario' = 'inicio';
  isAdminSidebarOpen = true;

  isAdminPropertyModalOpen = false;
  isEditingProperty = false;
  adminPropertyForm = {
    id: 0,
    nombre: '',
    precio: '',
    descripcion: '',
    estado: 'Libre',
    imagen: ''
  };

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

  // ================== BUSCADOR ADMIN MEJORADO ==================
  adminSearchQuery = '';
  isAdminSearchOpen = false;
  
  get adminSearchRes() {
    if (!this.adminSearchQuery.trim()) return [];
    const q = this.adminSearchQuery.toLowerCase();
    
    const resProps = this.properties
      .filter(p => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q))
      .map(p => ({ type: 'Propiedad', title: p.name, subtitle: p.location, obj: p }));
      
    const resReservas = this.reservasBase
      .filter(r => r.huesped.toLowerCase().includes(q) || r.nombrePropiedad.toLowerCase().includes(q))
      .map(r => ({ type: 'Reserva', title: `Reserva de ${r.huesped}`, subtitle: r.nombrePropiedad, obj: r }));
    
    return [...resProps, ...resReservas].slice(0, 5);
  }

  hideAdminSearchDelay() {
    setTimeout(() => this.isAdminSearchOpen = false, 200);
  }

  clickAdminSearch(res: any) {
    if (res.type === 'Propiedad') {
      this.setAdminView('propiedades');
      // Ahora abre el modal directamente
      this.adminOpenEditarPropiedad(res.obj);
    } else if (res.type === 'Reserva') {
      this.setAdminView('inicio');
      this.verDetallesReserva(res.obj);
    }
    this.adminSearchQuery = '';
    this.isAdminSearchOpen = false;
  }

  // ================== NOTIFICACIONES ADMIN ==================
  isNotificationsOpen = false;
  adminNotificaciones = [
    { id: 1, titulo: "Nueva actualización", mensaje: "¡Bienvenido a tu panel renovado de Smart Host!", tiempo: "Hace 5 min", leida: false },
    { id: 2, titulo: "Mensaje de Pedro Ruiz", mensaje: "Perfecto, nos vemos mañana", tiempo: "Hace 1 hora", leida: false },
    { id: 3, titulo: "Limpieza pendiente", mensaje: "Suite Ejecutiva requiere limpieza", tiempo: "Hace 1 día", leida: true }
  ];

  get notificacionesNoLeidas() {
    return this.adminNotificaciones.filter(n => !n.leida).length;
  }

  marcarTodasLeidas() {
    this.adminNotificaciones.forEach(n => n.leida = true);
    this.saveData();
  }

  get adminPropiedadesFiltradas() {
    if (this.adminPropiedadesFiltro === "Todos") return this.properties;
    return this.properties.filter(p => p.estado === this.adminPropiedadesFiltro);
  }

  // ================== MENSAJES INDEPENDIENTES ==================
  adminMensajesTab: 'chats' | 'resenas' = 'chats';
  adminMensajesBusqueda: string = "";
  adminMensajeInput: string = "";
  
  adminContactos: Contacto[] = [
    { 
      id: 1, nombre: "Carlos Martinez", ultimo: "Gracias por la informacion!", tiempo: "10:40", noLeidos: 2, propiedad: "Loft Moderno Parque La Carolina", imagen: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop", fechas: "15-18 Ene 2026",
      chat: [
        { id: 1, texto: "Hola! Tengo una reserva para este fin de semana.", enviado: false, hora: "10:30" },
        { id: 2, texto: "Hola Carlos! Si, ya tenemos tu reserva confirmada.", enviado: true, hora: "10:32" },
        { id: 3, texto: "Perfecto! A que hora puedo hacer el check-in?", enviado: false, hora: "10:35" },
        { id: 4, texto: "El check-in es a partir de las 14:00.", enviado: true, hora: "10:38" },
        { id: 5, texto: "Gracias por la informacion!", enviado: false, hora: "10:40" }
      ]
    },
    { 
      id: 2, nombre: "Ana Garcia", ultimo: "A que hora es el check-in?", tiempo: "09:15", noLeidos: 0, propiedad: "Suite Ejecutiva con Vista al Pichincha", imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop", fechas: "20-25 Ene 2026",
      chat: [
        { id: 1, texto: "Buenos días, tengo una duda sobre la suite.", enviado: false, hora: "09:00" },
        { id: 2, texto: "Buenos días Ana, dime, ¿en qué te puedo ayudar?", enviado: true, hora: "09:05" },
        { id: 3, texto: "A que hora es el check-in?", enviado: false, hora: "09:15" }
      ]
    },
    { 
      id: 3, nombre: "Pedro Ruiz", ultimo: "Perfecto, nos vemos mañana", tiempo: "Ayer", noLeidos: 0, propiedad: "Casa Patrimonial Restaurada", imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop", fechas: "10-12 Ene 2026",
      chat: [
        { id: 1, texto: "Hola, ya llegamos a Quito, estamos en camino a la casa.", enviado: false, hora: "15:00" },
        { id: 2, texto: "¡Excelente! El guardia ya tiene sus llaves.", enviado: true, hora: "15:10" },
        { id: 3, texto: "Perfecto, nos vemos mañana", enviado: false, hora: "15:15" }
      ]
    }
  ];

  adminContactoActivo = this.adminContactos[0];

  adminResenas = [
    { id: 1, nombre: "Laura Mendez", propiedad: "Loft Moderno Parque La Carolina", rating: 5, texto: "Excelente ubicacion y muy limpio. Volveria sin duda!", fecha: "hace 2 dias" },
    { id: 2, nombre: "Roberto Diaz", propiedad: "Suite Ejecutiva con Vista al Pichincha", rating: 4, texto: "Muy comodo para viajes de trabajo. Solo falta mejor WiFi.", fecha: "hace 1 semana" }
  ];

  get adminContactosFiltrados() {
    return this.adminContactos.filter(c => c.nombre.toLowerCase().includes(this.adminMensajesBusqueda.toLowerCase()));
  }

  get ocupacionPorcentajeGeneral() {
    if (this.properties.length === 0) return 0;
    const ocupadas = this.properties.filter(p => p.estado === 'Ocupado').length;
    return Math.round((ocupadas / this.properties.length) * 100) + 60;
  }

  get totalReservasMes() {
    return 13 + this.reservasBase.length;
  }

  get totalLimpiezasPendientes() {
    return this.tareasLimpieza.filter(t => !t.completada).length;
  }

  get totalMensajesNuevos() {
    return this.adminContactos.reduce((total, contacto) => total + contacto.noLeidos, 0);
  }

  get checkinsHoy() {
    return this.reservasBase;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const savedData = localStorage.getItem('smartHostDB');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.properties) this.properties = parsed.properties;
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
            // Seguro para actualizar datos viejos a la nueva estructura de chats
            if (!c.chat) {
              c.chat = [{ id: 1, texto: c.ultimo, enviado: false, hora: c.tiempo }];
            }
            return c;
          });
        }
        
        if (this.adminContactos.length > 0) {
          this.adminContactoActivo = this.adminContactos[0];
        }
      } catch (e) {
        console.error("Error al cargar datos locales", e);
      }
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

  verDetallesReserva(res: Reserva) {
    this.adminReservaSeleccionada = res;
  }

  cerrarDetallesReserva() {
    this.adminReservaSeleccionada = null;
  }


  marcarLimpieza(tarea: TareaLimpieza) {
    tarea.completada = !tarea.completada;
    if (tarea.completada) {
      this.showToast(`Limpieza de ${tarea.propiedad} completada`);
    }
    this.saveData();
  }

  adminOpenNuevaPropiedad() {
    this.isEditingProperty = false;
    this.adminPropertyForm = {
      id: 0,
      nombre: '',
      precio: '',
      descripcion: '',
      estado: 'Libre',
      imagen: ''
    };
    this.isAdminPropertyModalOpen = true;
  }

  adminOpenEditarPropiedad(prop: Property) {
    this.isEditingProperty = true;
    this.adminPropertyForm = {
      id: prop.id,
      nombre: prop.name,
      precio: prop.price.toString(),
      descripcion: prop.description,
      estado: prop.estado || 'Libre',
      imagen: prop.image
    };
    this.isAdminPropertyModalOpen = true;
  }

  adminGuardarPropiedad() {
    if (!this.adminPropertyForm.nombre || !this.adminPropertyForm.precio) {
      this.showToast('Por favor, llena los campos principales.');
      return;
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
        id: newId,
        name: this.adminPropertyForm.nombre,
        location: 'Quito, Ecuador',
        price: parseFloat(this.adminPropertyForm.precio.replace('$', '')) || 50,
        rating: 0,
        reviews: 0,
        type: 'Departamentos',
        capacity: 2,
        image: this.adminPropertyForm.imagen || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        images: [
          this.adminPropertyForm.imagen || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop'
        ],
        amenities: ['WiFi', 'TV'],
        description: this.adminPropertyForm.descripcion || 'Nueva propiedad en Smart Host.',
        estado: this.adminPropertyForm.estado
      };
      
      this.properties.unshift(newProp);
      
      this.propiedadesCalendario.push({
        id: newId,
        nombre: newProp.name,
        diasOcupados: []
      });

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
    
    this.adminPropiedadSeleccionada.diasOcupados.push(...this.adminDiasSeleccionados);
    this.showToast(`Fechas bloqueadas: ${this.adminDiasSeleccionados.length} días en ${this.adminPropiedadSeleccionada.nombre}`);
    this.adminDiasSeleccionados = [];
    this.saveData();
  }

  adminMesAnterior() {
    this.adminMesActual = new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth() - 1, 1);
    this.adminDiasSeleccionados = [];
  }

  adminMesSiguiente() {
    this.adminMesActual = new Date(this.adminMesActual.getFullYear(), this.adminMesActual.getMonth() + 1, 1);
    this.adminDiasSeleccionados = [];
  }

  adminSeleccionarContacto(contacto: Contacto) {
    this.adminContactoActivo = contacto;
    contacto.noLeidos = 0;
    this.saveData();
  }

  adminEnviarMensaje() {
    if (this.adminMensajeInput.trim()) {
      const horaActual = new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
      
      this.adminContactoActivo.chat.push({
        id: this.adminContactoActivo.chat.length + 1,
        texto: this.adminMensajeInput,
        enviado: true,
        hora: horaActual
      });
      
      this.adminContactoActivo.ultimo = this.adminMensajeInput;
      this.adminContactoActivo.tiempo = "ahora";
      this.adminMensajeInput = "";
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
    this.saveData();
  }

  logout() {
    this.isLoggedIn = false;
    this.userName = '';
    this.isUserMenuOpen = false;
    this.showToast('Sesión cerrada');
    this.saveData();
  }

  showWipToast() {
    this.isUserMenuOpen = false;
    this.showToast('Esta función está en construcción 🚧');
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

  handleReservation() {
    if (!this.isLoggedIn) {
      this.openAuthModal('login');
      this.showToast('Inicia sesión para solicitar una reserva');
      return;
    }

    if (!this.resDateIn || !this.resDateOut || !this.selectedProperty) {
      this.showToast('Por favor selecciona las fechas de tu reserva');
      return;
    }

    this.reservasBase.push({
      id: Date.now(),
      propiedadId: this.selectedProperty.id,
      nombrePropiedad: this.selectedProperty.name,
      huesped: this.userName || 'Viajero',
      fechaCheckIn: new Date(this.resDateIn + 'T12:00:00'),
      fechaCheckOut: new Date(this.resDateOut + 'T12:00:00'),
      estado: 'Pendiente'
    });

    this.tareasLimpieza.push({
      id: Date.now(),
      propiedad: this.selectedProperty.name,
      descripcion: 'Limpieza post-reserva programada',
      asignado: 'Por asignar',
      completada: false
    });

    const calProp = this.propiedadesCalendario.find(p => p.id === this.selectedProperty?.id);
    if (calProp) {
      let currentDate = new Date(this.resDateIn + 'T12:00:00');
      const endDate = new Date(this.resDateOut + 'T12:00:00');
      while (currentDate <= endDate) {
        calProp.diasOcupados.push(currentDate.getDate());
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    this.selectedProperty.estado = 'Ocupado';
    
    this.adminNotificaciones.unshift({
      id: Date.now(),
      titulo: 'Nueva Reserva',
      mensaje: `${this.userName || 'Viajero'} ha reservado ${this.selectedProperty.name}`,
      tiempo: 'ahora',
      leida: false
    });

    this.showToast('¡Reserva confirmada con éxito!');
    this.resDateIn = ''; this.resDateOut = '';
    this.resInputTypeIn = 'text'; this.resInputTypeOut = 'text';
    this.saveData();
    setTimeout(() => this.handleBackToCatalog(), 1500);
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
      
      const nuevoContacto: Contacto = {
        id: Date.now(),
        nombre: this.userName || 'Viajero Nuevo',
        ultimo: this.contactMessage,
        tiempo: "ahora",
        noLeidos: 1,
        propiedad: this.selectedProperty?.name || 'Consulta General',
        imagen: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
        fechas: this.formattedSearchDates !== 'Agregar fechas' ? this.formattedSearchDates : 'Sin fechas',
        chat: [
          {
            id: 1,
            texto: this.contactMessage,
            enviado: false,
            hora: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
          }
        ]
      };
      
      this.adminContactos.unshift(nuevoContacto);
      
      this.adminNotificaciones.unshift({
        id: Date.now(),
        titulo: 'Nuevo Mensaje',
        mensaje: `${this.userName || 'Viajero'}: "${this.contactMessage}"`,
        tiempo: 'ahora',
        leida: false
      });
      
      this.showToast('Mensaje enviado al anfitrión');
      this.contactMessage = ''; this.isContactModalOpen = false;
      this.saveData();
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