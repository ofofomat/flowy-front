import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  isLogin = true;
  passwordFieldType = 'password';
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(event: Event): void {
    event.preventDefault();
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      console.error('Login failed: invalid username or password');
    }
  }

  register(): void {
    if (this.authService.register(this.username, this.password)) {
      console.log('Registro bem-sucedido');
    } else {
      console.error('Falha no registro: nome de usuário já existe');
    }
  }

  toggleForm(isLogin: boolean): void {
    if (isLogin === this.isLogin) return;
    this.isLogin = isLogin;
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
