import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-zona',
    standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.css']
})
export class ZoneEditComponent implements OnInit {
  zona: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.zona = {
      id,
      nombre: 'Zona Ejemplo',
      lat: 64.2,
      lng: 12.85,
      radio: 12.85
    };
  }

  guardarCambios(): void {
    console.log('Zona modificada:', this.zona);
    this.router.navigate(['/zones/zones-admin']);
  }
}