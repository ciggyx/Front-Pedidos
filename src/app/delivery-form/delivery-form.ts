// src/app/delivery-form/delivery-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveriesService } from '../services/delivery.service';
import { CreateDeliveryDto } from '../interfaces/delivery.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.html',
  styleUrls: ['./delivery-form.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DeliveryFormComponent implements OnInit {
  deliveryForm!: FormGroup; //  "!" inicia ngOnInit
  isSubmitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private deliveriesService: DeliveriesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.deliveryForm = new FormGroup({
      personId: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      location: new FormGroup({
        lat: new FormControl(null, [
          Validators.required,
          Validators.min(-90),
          Validators.max(90),
        ]),
        lng: new FormControl(null, [
          Validators.required,
          Validators.min(-180),
          Validators.max(180),
        ]),
      }),
      radius: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
      ]),
    });
  }

  get f() {
    return this.deliveryForm.controls;
  }

  get locationFormGroup(): FormGroup {
    return this.deliveryForm.get('location') as FormGroup;
  }

  get latControl(): FormControl {
    return this.locationFormGroup.get('lat') as FormControl;
  }

  get lngControl(): FormControl {
    return this.locationFormGroup.get('lng') as FormControl;
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    if (this.deliveryForm.invalid) {
      this.errorMessage =
        'Por favor, complete todos los campos requeridos y corrija los errores.';
      this.isSubmitting = false;
      this.deliveryForm.markAllAsTouched();
      return;
    }

    const newDelivery: CreateDeliveryDto = this.deliveryForm.value;

    this.deliveriesService
      .createDelivery(newDelivery)
      .pipe(
        catchError((err) => {
          console.error('Error al crear entrega:', err);
          this.errorMessage =
            'Error al crear la entrega. Por favor, intente de nuevo.';
          this.isSubmitting = false;
          return of(null);
        }),
      )
      .subscribe((response) => {
        if (response) {
          this.successMessage = 'Entrega creada exitosamente.';
          this.deliveryForm.reset(); // Limpia el formulario
          // navega a la lista de entregas
          setTimeout(() => {
            this.router.navigate(['/deliveries']);
          }, 2000);
        }
        this.isSubmitting = false;
      });
  }

  // Método para manejar la navegación de vuelta si el usuario cancela
  goBack(): void {
    this.router.navigate(['/deliveries']);
  }
}

