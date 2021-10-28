import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService {
  static JWT_KEY: string = 'jwt';
  static NO_ACCOUNT_KEY: string = 'noaccount';

  constructor(private router: Router) {
  }

  // STORE token in local storage of the browser
  store(jwt: string): void{
    localStorage.setItem(JwtStorageService.JWT_KEY, jwt);
  }

  // READ token in local storage of the browser
  read(): string{
    return localStorage.getItem(JwtStorageService.JWT_KEY);
  }

  // REMOVE toke in local storage of the browser
  remove(): void{
    localStorage.removeItem(JwtStorageService.JWT_KEY);
    this.router.navigate(['/login']);
  }

  // Decode and get ID of the current user
  getID(): string {
    const decoded = jwtDecode(this.read());
    return decoded['id'];
  }

  // Decode and get USERNAME of the current user
  getUsername(): string {
    const decoded = jwtDecode(this.read());
    return decoded['name'];
  }

  // Decode and get ROLE of the current user
  getEmail(): string {
    const decoded = jwtDecode(this.read());
    return decoded ? decoded['email'] : undefined;
  }

  // CHECK if the token in local storage is correct
  checkToken(): boolean {
    const user = this.getUsername();
    const id = this.getID();

    return !!(isNotNullOrUndefined(user) || isNotNullOrUndefined(id));
  }

  // Simple CHECK if a token is in the local storage for a logged user
  isLoggedIn(): boolean {
    return !!localStorage.getItem(JwtStorageService.JWT_KEY);
  }

  storeNoAccountUser(noaccount: string): void{
    localStorage.setItem(JwtStorageService.NO_ACCOUNT_KEY, noaccount);
  }

  // READ token in local storage of the browser
  readNoAccountUser(): string{
    return localStorage.getItem(JwtStorageService.NO_ACCOUNT_KEY);
  }

  // REMOVE toke in local storage of the browser
  removeNoAccountUser(): void{
    localStorage.removeItem(JwtStorageService.NO_ACCOUNT_KEY);
  }

  // Simple CHECK if a token is in the local storage for a unregistered user
  noAccountUser(): boolean {
    return !!localStorage.getItem(JwtStorageService.NO_ACCOUNT_KEY);
  }
}
