import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeliveryService {
  private apiUrl = 'http://localhost:3000/deliveries';

  constructor(private http: HttpClient) {}

  getDeliveries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteDelivery(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }
}
