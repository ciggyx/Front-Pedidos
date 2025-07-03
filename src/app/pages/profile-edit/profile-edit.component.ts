import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-profile-edit.component',
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})

export class ProfileEditComponent implements OnInit {
  profileImage: string | null = null;
  tempImage: string | null = null; 
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.profileImage = localStorage.getItem('profileImage');
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.tempImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  cancel(): void {
    this.tempImage = null;
    this.router.navigate(['/home']);
  }

  confirm(): void {
  if (this.tempImage) {
    this.profileImage = this.tempImage;
    localStorage.setItem('profileImage', this.profileImage);
  }
  this.router.navigate(['/home']);
}
}

