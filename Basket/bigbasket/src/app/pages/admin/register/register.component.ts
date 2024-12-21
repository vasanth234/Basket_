import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.username && this.email && this.password) {
      this.authService.register(this.username, this.email, this.password).subscribe(
        (response) => {
          alert('User created successfully');
          this.router.navigate(['/login'])
        },
        (error) => {
          this.error = error.error || 'Registration failed';
        }
      );
    }
  }

}
