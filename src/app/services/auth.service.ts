import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { id: 1, userName: 'usuario1', password: 'senha123', email: 'usuario1@example.com' },
    { id: 2, userName: 'usuario2', password: 'senha456', email: 'usuario2@example.com' }
  ];

  constructor() { }

  login(userName: string, password: string): boolean {
    const user = this.users.find(u => u.userName === userName && u.password === password);
    if (!user) return false;    
   
    return true;
  }

  register(userName: string, password: string): boolean {
    const user: User = new User(this.users.length + 1, userName, password, `${userName}@example.com`);

    this.users.push(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
}
