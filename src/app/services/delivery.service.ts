// src/app/services/deliveries.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Delivery,
  CreateDeliveryDto,
  UpdateLocationDto,
  UpdateStatusDto,
} from '../interfaces/delivery.interface';

@Injectable({
  providedIn: 'root',
})
export class DeliveriesService {
  private apiUrl = 'http://localhost:3000/api/v1/delivery';

  constructor(private http: HttpClient) {}

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUrl);
  }

  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.apiUrl}/${id}`);
  }

  createDelivery(delivery: CreateDeliveryDto): Observable<Delivery> {
    return this.http.post<Delivery>(this.apiUrl, delivery);
  }

  updateDelivery(
    id: number,
    delivery: Partial<CreateDeliveryDto>,
  ): Observable<Delivery> {
    return this.http.patch<Delivery>(`${this.apiUrl}/${id}`, delivery);
  }

  updateDeliveryLocation(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Observable<Delivery> {
    return this.http.patch<Delivery>(
      `${this.apiUrl}/${id}/location`,
      updateLocationDto,
    );
  }

  updateDeliveryStatus(
    id: number,
    updateStatusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/status`, updateStatusDto);
  }

  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

