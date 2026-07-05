import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Property, Reserva, TareaLimpieza } from '../models/property.model';
import { Contacto } from '../models/chat.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  // Core Service (Propiedades, Reservas)
  private coreUrl = 'http://localhost:3002/api';
  // Users Service (Usuarios, Pagos, Chat)
  private usersUrl = 'http://localhost:3001/api';
  
  private http = inject(HttpClient);

  constructor() { }

  async getProperties(): Promise<Property[]> {
    try {
      const props = await firstValueFrom(this.http.get<Property[]>(`${this.coreUrl}/properties`));
      return props || [];
    } catch (e) {
      console.error('Error fetching properties from backend', e);
      return [];
    }
  }

  async getReservations(): Promise<Reserva[]> {
    try {
      const res = await firstValueFrom(this.http.get<Reserva[]>(`${this.coreUrl}/reservations`));
      return res || [];
    } catch (e) {
      console.error('Error fetching reservations', e);
      return [];
    }
  }

  async saveReservation(reserva: Reserva): Promise<boolean> {
    try {
      const payload = {
        propiedad_id: reserva.propiedadId,
        fecha_check_in: reserva.fechaCheckIn,
        fecha_check_out: reserva.fechaCheckOut,
        estado: reserva.estado || 'Pendiente',
        huesped_id: 2, // Hardcoded for mockup
        metodo_pago_id: 2
      };
      await firstValueFrom(this.http.post(`${this.coreUrl}/reservations`, payload));
      return true;
    } catch (e) {
      console.error('Error saving reservation', e);
      return false;
    }
  }

  async cancelReservation(id: number): Promise<any> {
    try {
      await firstValueFrom(this.http.post(`${this.coreUrl}/reservations/${id}/cancel`, {}));
      return true;
    } catch (e) {
      console.error('Error cancelling reservation', e);
      return false;
    }
  }
}
