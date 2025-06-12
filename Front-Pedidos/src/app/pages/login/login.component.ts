import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Si vas a usar formularios reactivos o de plantilla

@Component({
  selector: 'app-login',
  standalone: true, // ¡¡¡Esta línea es crucial!!!
  imports: [
    CommonModule,
    // Agrega FormsModule o ReactiveFormsModule si planeas usar ngModel o FormGroup/FormControl
    // FormsModule,
    // ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Puedes añadir lógica aquí si es necesario
}
