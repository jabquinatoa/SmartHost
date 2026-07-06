import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Property, Reserva, TareaLimpieza, MetodoPago } from '../models/property.model';
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

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (!token) return { headers: new HttpHeaders() };
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // === AUTHENTICATION ===
  async login(email: string, password: string): Promise<any> {
    try {
      const res = await firstValueFrom(this.http.post(`${this.usersUrl}/auth/login`, { email, password }));
      return res;
    } catch (e) {
      console.error('Login error', e);
      return null;
    }
  }

  async register(nombre: string, email: string, telefono: string, password: string): Promise<any> {
    try {
      const res = await firstValueFrom(this.http.post(`${this.usersUrl}/auth/register`, { nombre, email, telefono, password }));
      return res;
    } catch (e) {
      console.error('Register error', e);
      return null;
    }
  }

  async getProperties(): Promise<Property[]> {
    try {
      const props: any = await firstValueFrom(this.http.get(`${this.coreUrl}/properties`));
      if (!props) return [];
      return props.map((p: any) => ({
        ...p,
        id: p.ID || p.id
      })) as Property[];
    } catch (e) {
      console.error('Error fetching properties from backend', e);
      return [];
    }
  }

  async getReservations(): Promise<Reserva[]> {
    try {
      const res: any = await firstValueFrom(this.http.get(`${this.coreUrl}/reservations`));
      if (!res) return [];
      return res.map((r: any) => ({
        ...r,
        id: r.ID || r.id,
        propiedadId: r.propiedad_id || r.propiedadId,
        huespedId: r.huesped_id || r.huespedId,
        fechaCheckIn: r.fecha_check_in || r.fechaCheckIn,
        fechaCheckOut: r.fecha_check_out || r.fechaCheckOut,
      })) as Reserva[];
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
        estado: reserva.estado || 'Reserva con éxito',
        huesped_id: 2, // Backend can override this from JWT
        metodo_pago_id: 2
      };
      await firstValueFrom(this.http.post(`${this.coreUrl}/reservations`, payload, this.getAuthHeaders()));
      return true;
    } catch (e) {
      console.error('Error saving reservation', e);
      return false;
    }
  }

  async cancelReservation(id: number): Promise<any> {
    try {
      await firstValueFrom(this.http.post(`${this.coreUrl}/reservations/${id}/cancel`, {}, this.getAuthHeaders()));
      return true;
    } catch (e) {
      console.error('Error cancelling reservation', e);
      return false;
    }
  }

	// === REVIEWS (Core Service) ===
	async getReviews(propertyId: number): Promise<any[]> {
		try {
			const res = await firstValueFrom(this.http.get<any[]>(`${this.coreUrl}/properties/${propertyId}/reviews`));
			return res || [];
		} catch (e) {
			console.error('Error fetching reviews', e);
			return [];
		}
	}

	async createReview(propertyId: number, review: any): Promise<boolean> {
		try {
			await firstValueFrom(this.http.post(`${this.coreUrl}/properties/${propertyId}/reviews`, review));
			return true;
		} catch (e) {
			console.error('Error creating review', e);
			return false;
		}
	}

	async getAllReviews(): Promise<any[]> {
		try {
			const res = await firstValueFrom(this.http.get<any[]>(`${this.coreUrl}/reviews`));
			return res || [];
		} catch (e) {
			console.error('Error fetching all reviews', e);
			return [];
		}
	}

  // === PAGOS (Users Service) ===
  async getPagos(): Promise<MetodoPago[]> {
    try {
      const res = await firstValueFrom(this.http.get<any[]>(`${this.usersUrl}/payments`));
      return res.map(p => ({
        id: p.ID,
        tipo: p.tipo,
        banco: p.banco,
        cuenta: p.cuenta,
        celular: p.celular,
        titular: p.titular,
        identificacion: p.identificacion
      })) as MetodoPago[];
    } catch (e) {
      console.error('Error fetching payments', e);
      return [];
    }
  }

  async createPago(pago: Partial<MetodoPago>): Promise<MetodoPago | null> {
    try {
      const res: any = await firstValueFrom(this.http.post(`${this.usersUrl}/payments`, pago));
      return {
        id: res.ID,
        tipo: res.tipo,
        banco: res.banco,
        cuenta: res.cuenta,
        celular: res.celular,
        titular: res.titular,
        identificacion: res.identificacion
      } as MetodoPago;
    } catch (e) {
      console.error('Error creating payment', e);
      return null;
    }
  }

  async updatePago(pago: Partial<MetodoPago>): Promise<boolean> {
    try {
      await firstValueFrom(this.http.put(`${this.usersUrl}/payments/${pago.id}`, pago));
      return true;
    } catch (e) {
      console.error('Error updating payment', e);
      return false;
    }
  }

  async deletePago(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.http.delete(`${this.usersUrl}/payments/${id}`));
      return true;
    } catch (e) {
      console.error('Error deleting payment', e);
      return false;
    }
  }
}
