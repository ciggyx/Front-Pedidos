import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Zone } from '../../../interfaces/zone.interface'; 
import { ZonesService } from '../../../services/zone.service'; 
import { finalize } from 'rxjs/operators'; 

@Component({
  selector: 'app-zonas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zones-admin.component.html',
  styleUrls: ['./zones-admin.component.css']
})
export class ZonesAdminComponent implements OnInit { 
  zonas: Zone[] = []; 
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;
  isLoading = false; 
  errorMessage: string | null = null; 

  constructor(private router: Router, private zonesService: ZonesService) {} 

  ngOnInit(): void {
    this.loadZonas(); 
  }

  loadZonas(): void {
    this.isLoading = true;
    this.errorMessage = null; 

    this.zonesService.getAllZones()
      .pipe(
        finalize(() => this.isLoading = false) 
      )
      .subscribe({
        next: (data) => {
          this.zonas = data;
          this.currentPage = 1; // Reinicia la paginación 
        },
        error: (error) => {
          console.error('Error al cargar las zonas:', error);
          this.errorMessage = 'No se pudieron cargar las zonas. Inténtalo de nuevo más tarde.';
        }
      });
  }

  get filteredZonas(): Zone[] {
    const term = this.searchTerm.toLowerCase();
    return this.zonas.filter(z =>
      z.name.toLowerCase().includes(term) 
      || z.location.lat.toString().includes(term)
      || z.location.lng.toString().includes(term)
      || z.radius.toString().includes(term)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredZonas.length / this.pageSize);
  }

  get paginatedZonas(): Zone[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredZonas.slice(start, start + this.pageSize);
  }

  changePage(n: number) {
    if (n >= 1 && n <= this.totalPages) {
      this.currentPage = n;
    }
  }

  goToEditZone(id: number) {
    // La ruta debe coincidir con zones.routes.ts
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

  eliminar(zona: Zone) {
    if (confirm(`¿Estás seguro de que quieres eliminar la zona "${zona.name}"?`)) {
      this.zonesService.deleteZone(zona.id).subscribe({
        next: () => {
          console.log(`Zona ${zona.name} eliminada.`);
          this.loadZonas(); 
        },
        error: (error) => {
          console.error('Error al eliminar la zona:', error);
          this.errorMessage = `No se pudo eliminar la zona "${zona.name}".`;
        }
      });
    }
  }
}