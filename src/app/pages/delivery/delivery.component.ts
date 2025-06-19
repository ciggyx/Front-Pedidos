import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: 'delivery.component.html',
  styleUrls: ['delivery.component.css'],
  imports: [RouterModule]
})
export class DeliveryComponent {
  menuOpen = false;

  deliveries = [
    {
      id: 1,
      nombre: 'Valentín',
      ubicacion: { lat: -31.4, lng: -64.2 },
      estado: 'Avaible',
      personID: '123014'
    },
    {
      id: 2,
      nombre: 'Ramiro',
      ubicacion: { lat: -31.5, lng: -64.3 },
      estado: 'In Route',
      personID: '123015'
    },
    {
      id: 3,
      nombre: 'Dozer',
      ubicacion: { lat: -31.5, lng: -64.3 },
      estado: 'In Route',
      personID: '123016'
    }
  ];

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    setTimeout(() => {
      this.menuOpen = false;
    }, 200);
  }

  deleteDelivery(id: number) {
    console.log('Eliminar delivery con ID:', id);
    this.deliveries = this.deliveries.filter(d => d.id !== id);
  }

  updateStatus(id: number) {
    console.log('Actualizar estado de delivery con ID:', id);
    const delivery = this.deliveries.find(d => d.id === id);
    if (delivery) {
      delivery.estado = delivery.estado === 'Avaible' ? 'In Route' : 'Avaible';
    }
  }

  manageZones(id: number) {
    console.log('Administrar zonas del delivery con ID:', id);
    // Aquí podrías navegar a otra ruta o abrir un modal
  }
}