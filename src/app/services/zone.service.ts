import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone, CreateZoneDto, UpdateZoneDto, ReplaceZoneDto } from '../interfaces/zone.interface'; 

@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  private apiUrl = 'http://localhost:3000/api/v1/zone'; 

  constructor(private http: HttpClient) { }

  getAllZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.apiUrl);
  }

  getZoneById(id: number): Observable<Zone> {
    return this.http.get<Zone>(`${this.apiUrl}/${id}`);
  }

  createZone(zone: CreateZoneDto): Observable<Zone> {
    return this.http.post<Zone>(this.apiUrl, zone);
  }
 
  updateZone(id: number, zone: ReplaceZoneDto): Observable<Zone> {
    return this.http.put<Zone>(`${this.apiUrl}/${id}`, zone);
  }

  deleteZone(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}