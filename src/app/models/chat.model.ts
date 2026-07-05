export interface ChatMessage {
  id: number;
  texto: string;
  enviado: boolean;
  hora: string;
  soloAnfitrion?: boolean;
}

export interface Contacto {
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
