import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports:[CommonModule]
})
export class HeaderComponent {
  constructor(private router: Router) {}
  profileImage: string | null = null;

  goHome() {
    this.router.navigate(['/home']);
  }
  logout(): void {
    this.router.navigate(['/auth/login']);
  }
  goToPerfil(): void {
    this.router.navigate(['/perfil']);
  }
  ngOnInit(): void {
    this.profileImage = localStorage.getItem('profileImage');
  }
}
