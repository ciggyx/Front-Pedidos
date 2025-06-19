import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Zona {
  id: number;
  nombre: string;
  imagen: string;
  lat: number;
  lng: number;
  radio: number;
}

@Component({
  selector: 'app-zonas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zones-admin.component.html',
  styleUrls: ['./zones-admin.component.css']
})
export class ZonesAdminComponent {
  zonas: Zona[] = [
  { id: 1, nombre: 'Ameghino',    imagen: 'assets/images/elpisoeslaburo.jpg', lat: 64.2,  lng: 12.85, radio: 12.85 },
  { id: 2, nombre: 'Centro',       imagen: 'assets/images/elpisoeslaburo.jpg', lat: 85.9,  lng: 64.2,  radio: 12.85 },
  { id: 3, nombre: 'San Martin',   imagen: 'assets/images/elpisoeslaburo.jpg', lat: 78.1,  lng: 17.23, radio: 12.85 },
  { id: 4, nombre: 'Las Playas',   imagen: 'assets/images/elpisoeslaburo.jpg', lat:  9.98, lng: 67.5,  radio: 12.85 },
  { id: 5, nombre: 'Bota',         imagen: 'assets/images/elpisoeslaburo.jpg', lat: 64.8,  lng: 81.8,  radio: 12.85 },
  { id: 6, nombre: 'Rivadavia',    imagen: 'assets/images/elpisoeslaburo.jpg', lat: 52.12, lng: 73.2,  radio: 12.85 },
  { id: 7, nombre: 'Alto Verde',   imagen: 'assets/images/elpisoeslaburo.jpg',lat: 41.3,  lng: 55.1,  radio: 15.2  },
  { id: 8, nombre: 'Este texto es muy largo al proposito para testear si la tabla se comporta como quiero', imagen: 'assets/images/elpisoeslaburo.jpg',lat: 23.7,  lng: 45.9,  radio: 10.0  },
  { id: 9, nombre: 'El piso es laburo',      imagen: 'assets/images/elpisoeslaburo.jpg',lat: 67.4,  lng: 30.2,  radio: 8.75  },
  { id: 10, nombre: 'La Vega',      imagen: 'assets/images/elpisoeslaburo.jpg',lat: 12.9,  lng: 90.4,  radio: 20.0  },
  { id: 11, nombre: 'Miramar',      imagen: 'assets/images/elpisoeslaburo.jpg',lat: 55.5,  lng: 44.4,  radio: 5.5   },
  { id: 12, nombre: 'Puerto Azul',  imagen: 'assets/images/elpisoeslaburo.jpg',lat: 34.1,  lng: 77.7,  radio: 12.0  },
  { id: 13, nombre: 'La Pampa',     imagen: 'assets/images/elpisoeslaburo.jpg',lat: 48.8,  lng: 21.1,  radio: 18.3  },
  { id: 14, nombre: 'El Rincón',    imagen: 'assets/images/elpisoeslaburo.jpg',lat: 29.2,  lng: 66.6,  radio: 9.9   },
  { id: 15, nombre: 'San Lorenzo',  imagen: 'assets/images/elpisoeslaburo.jpg',lat: 71.0,  lng: 12.0,  radio: 11.1  },
  { id: 16, nombre: 'Nueva Esperanza', imagen: 'assets/images/elpisoeslaburo.jpg',lat: 39.9, lng: 80.2,  radio: 13.7  },
  { id: 17, nombre: 'Las Flores',   imagen: 'assets/images/elpisoeslaburo.jpg',lat: 60.6,  lng: 33.3,  radio: 7.2   },
  { id: 18, nombre: 'Monte Claro',  imagen: 'assets/images/elpisoeslaburo.jpg',lat: 50.0,  lng: 20.0,  radio: 16.4  },
  { id: 19, nombre: 'Bahía Serena', imagen: 'assets/images/elpisoeslaburo.jpg',lat: 22.5,  lng: 88.8,  radio: 14.0  },
  { id: 20, nombre: 'El Oasis',     imagen: 'assets/images/elpisoeslaburo.jpg',lat: 31.2,  lng: 61.1,  radio: 6.6   }
];
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;

  constructor(private router: Router) {}

  get filteredZonas(): Zona[] {
    const term = this.searchTerm.toLowerCase();
    return this.zonas.filter(z =>
      z.nombre.toLowerCase().includes(term)
      || z.lat.toString().includes(term)
      || z.lng.toString().includes(term)
      || z.radio.toString().includes(term)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredZonas.length / this.pageSize);
  }

  get paginatedZonas(): Zona[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredZonas.slice(start, start + this.pageSize);
  }

  changePage(n: number) {
    if (n >= 1 && n <= this.totalPages) {
      this.currentPage = n;
    }
  }

  goToEditZone(id: number) {
  this.router.navigate(['/zones/zones-admin/edit', id]);
}

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage)
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.changePage(this.currentPage); 
    }
  }

  onPageInputChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const newPage = Number(input.value);

  if (!isNaN(newPage) && newPage >= 1 && newPage <= this.totalPages) {
    this.changePage(newPage);
  } else {
    input.value = String(this.currentPage);
  }
}

  onPageSizeChange(ev: Event) {
    this.pageSize = +(ev.target as HTMLSelectElement).value;
    this.currentPage = 1;
  }

  eliminar(z: Zona) { console.log('Eliminar', z) }
}