import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor() {}

  isBoolean: boolean = false;

  logged() {
    this.isBoolean = true;
  }

  logout() {
    this.isBoolean = false;
  }

  isLoggedIn(): boolean {
    return this.isBoolean;
  }
}
