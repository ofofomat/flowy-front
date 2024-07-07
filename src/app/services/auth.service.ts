import { Injectable } from '@angular/core';
import { FlowyUser } from '../models/FlowyUser.model';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const DEFAULT_URL = `${environment.api}/user`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(userName: string, userPassword: string): Observable<FlowyUser> {
    const body = { userName, userPassword };
    return this.http.post<FlowyUser>(`${DEFAULT_URL}/findUser`, body);
  }

  register(user: FlowyUser): Observable<FlowyUser> {
    return this.http.post<FlowyUser>(DEFAULT_URL, user);
  }
}
