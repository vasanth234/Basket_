import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone:true,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports:[FormsModule]
})
export class ResetPasswordComponent {
  constructor(private http: HttpClient, private router: Router) {}

  onResetPassword(email: string) {
    const payload = { email: email };

    this.http.post('https://your-backend-api.com/reset-password', payload)
      .subscribe(
        response => {
          alert('Password reset link sent to your email!');
          this.router.navigate(['/login']);
        },
        error => {
          alert('Something went wrong. Please try again.');
        }
      );
  }
}
