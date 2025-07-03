export interface Location {
  lat: number;
  lng: number;
}

export interface Zone {
  id: number;
  name: string;
  radius: number;
  location: Location; 
}

export interface CreateZoneDto {
  name: string;
  radius: number;
  location: Location; 
}

export interface UpdateZoneDto {
  id?: number; 
  name?: string;
  radius?: number;
  location?: { 
    lat?: number;
    lng?: number;
  };
}

export interface ReplaceZoneDto {
  name: string;
  radius: number;
  location: Location;
}