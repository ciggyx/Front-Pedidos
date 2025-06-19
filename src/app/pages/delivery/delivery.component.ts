import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery',
  templateUrl: 'delivery.component.html',
  styleUrls: ['delivery.component.css']
})
export class DeliveryComponent {
  menuOpen = false;

  deliveries = [
    {
      id: 1,
      nombre: 'Valentín',
      ubicacion: { lat: -31.4, lng: -64.2 },
      estado: 'Pending',
      personID: '123014'
    },
    {
      id: 2,
      nombre: 'Ramiro',
      ubicacion: { lat: -31.5, lng: -64.3 },
      estado: 'Entregado',
      personID: '123015'
    },
    {
      id: 3,
      nombre: 'Dozer',
      ubicacion: { lat: -31.5, lng: -64.3 },
      estado: 'Entregado',
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
      delivery.estado = delivery.estado === 'Pending' ? 'Entregado' : 'Pending';
    }
  }

  manageZones(id: number) {
    console.log('Administrar zonas del delivery con ID:', id);
    // Aquí podrías navegar a otra ruta o abrir un modal
  }
}