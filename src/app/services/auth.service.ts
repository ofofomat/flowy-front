import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { id: 1, username: 'usuario1', password: 'senha123', email: 'usuario1@example.com' },
    { id: 2, username: 'usuario2', password: 'senha456', email: 'usuario2@example.com' }
  ];

  constructor() { }

  login(username: string, password: string): boolean {
    // Implementação do login
    return true; // Placeholder return statement
  }

  logout(): void {
    // Implementação do logout
  }

  register(user: User): void {
    this.users.push(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
}
