import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ZonesService } from '../../../services/zone.service';
import { Zone, UpdateZoneDto, ReplaceZoneDto } from '../../../interfaces/zone.interface';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-zone-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.css']
})
export class ZoneEditComponent implements OnInit {
  zoneForm: FormGroup;
  zoneId: number | null = null;
  isLoading = true;
  isSubmitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private zonesService: ZonesService
  ) {
    this.zoneForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      location: this.fb.group({
        lat: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
        lng: [null, [Validators.required, Validators.min(-180), Validators.max(180)]]
      }),
      radius: [null, [Validators.required, Validators.min(1), Validators.max(1000)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.zoneId = +idParam; // Convierte a número
        this.loadZone(this.zoneId);
      } else {
        this.errorMessage = 'ID de zona no proporcionado.';
        this.isLoading = false;
      }
    });
  }

  loadZone(id: number): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.zonesService.getZoneById(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (zone: Zone) => {
          this.zoneForm.patchValue({
            name: zone.name,
            location: {
              lat: zone.location.lat,
              lng: zone.location.lng
            },
            radius: zone.radius
          });
        },
        error: (error) => {
          console.error('Error al cargar la zona:', error);
          this.errorMessage = 'No se pudo cargar la zona. Asegúrate de que el ID sea correcto.';
        }
      });
  }

  get f() { return this.zoneForm.controls; }
  get locationGroup() { return this.zoneForm.get('location') as FormGroup; }
  get latControl() { return this.locationGroup.get('lat'); }
  get lngControl() { return this.locationGroup.get('lng'); }

  onSubmit(): void {
    this.isSubmitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.zoneForm.invalid) {
      this.zoneForm.markAllAsTouched(); 
      this.isSubmitting = false;
      return;
    }

    const updateDto: ReplaceZoneDto = this.zoneForm.value;

    if (this.zoneId) {
      this.zonesService.updateZone(this.zoneId, updateDto)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: () => {
            this.successMessage = 'Zona actualizada exitosamente!';
            // Opcional: Navegar de vuelta a la lista después de un tiempo
            setTimeout(() => this.router.navigate(['/zones/zones-admin']), 2000);
          },
          error: (error) => {
            console.error('Error al actualizar la zona:', error);
            this.errorMessage = 'Error al actualizar la zona. Intenta de nuevo.';
          }
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/zones/zones-admin']);
  }
}