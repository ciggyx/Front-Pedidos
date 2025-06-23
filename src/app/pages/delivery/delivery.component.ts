// src/app/pages/delivery/delivery.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeliveriesService } from '../../services/delivery.service';
import { Delivery, Zone } from '../../interfaces/delivery.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class DeliveryComponent implements OnInit {
  menuOpen = false;
  deliveries: Delivery[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private deliveriesService: DeliveriesService) {}

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries(): void {
    this.isLoading = true;
    this.error = null;
    this.deliveriesService
      .getAllDeliveries()
      .pipe(
        catchError((err) => {
          console.error('Error al cargar deliveries:', err);
          this.error =
            'No se pudieron cargar las entregas. Intente de nuevo más tarde.';
          this.isLoading = false;
          return of([]);
        }),
      )
      .subscribe((data: Delivery[]) => {
        this.deliveries = data;
        this.isLoading = false;
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    setTimeout(() => {
      this.menuOpen = false;
    }, 200);
  }

  deleteDelivery(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta entrega?')) {
      this.deliveriesService
        .deleteDelivery(id)
        .pipe(
          catchError((err) => {
            console.error('Error al eliminar delivery:', err);
            alert('Error al eliminar la entrega.');
            return of(null);
          }),
        )
        .subscribe(() => {
          this.deliveries = this.deliveries.filter((d) => d.id !== id);
          alert('Entrega eliminada con éxito.');
        });
    }
  }

  updateStatus(id: number, currentStatusName: string) {
    // Asegúrate que los nombres de estado aquí coincidan con los de tu backend
    const newStatusName =
      currentStatusName === 'Avaible' ? 'In Route' : 'Avaible';
    const updateDto = { status: newStatusName };

    this.deliveriesService
      .updateDeliveryStatus(id, updateDto)
      .pipe(
        catchError((err) => {
          console.error('Error al actualizar estado:', err);
          alert('Error al actualizar el estado de la entrega.');
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (response) {
          const index = this.deliveries.findIndex((d) => d.id === id);
          if (index !== -1) {
            // Asumiendo que response.status tiene el nuevo nombre del estado
            this.deliveries[index].status.name = response.status;
            alert('Estado de entrega actualizado con éxito.');
          }
        }
      });
  }

  manageZones(id: number) {
    console.log('Administrar zonas del delivery con ID:', id);
  }

  formatZones(zones: Zone[] | undefined): string {
    if (!zones || zones.length === 0) {
      return 'No hay zonas asignadas.';
    }
    return zones.map((zone) => zone.name).join(', ');
  }
}

