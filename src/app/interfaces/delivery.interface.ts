// src/app/models/delivery.model.ts

export interface Location {
  lat: number;
  lng: number;
}

export interface DeliveryStatus {
  id: number;
  name: string;
}

export interface Zone {
  id: number;
  name: string; // Asumiendo que la zona tiene un nombre
}

export interface Delivery {
  id: number;
  personId: string;
  location: Location;
  radius: number;
  status: DeliveryStatus; // Aquí es un objeto de estado completo
  zones?: Zone[]; // Las zonas pueden venir si haces las relaciones
}

export interface CreateDeliveryDto {
  personId: string;
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
  statusId?: number; // Opcional, tu backend tiene un default
}

export interface UpdateLocationDto {
  location: {
    lat: number;
    lng: number;
  };
}

export interface UpdateStatusDto {
  statusId: number; // Tu backend espera el nombre del estado
}