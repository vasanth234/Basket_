import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  /*loginObj: any = {
    userName: '',
    password: ''
  };

  constructor(private router: Router){}

onLogin(){

  if(this.loginObj.userName == "admin" && this.loginObj.password == "334455"){
this.router.navigateByUrl('/products')
  }

else{
alert('Wrong Credentials')
}
}*/


username: string = '';
password: string = '';
error: string = '';

constructor(private authService: AuthService, private router: Router) {}

login() {
  if (this.username && this.password) {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        alert('Login successful');
        this.router.navigate(['/products']); // Redirect to home page
      },
      (error) => {
        this.error = error.error || 'Login failed';
      }
    );
  }
}




}