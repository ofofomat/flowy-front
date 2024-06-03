import { Component } from '@angular/core';
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

  constructor(private authService: AuthService) { }

  login(event: Event): void {
    event.preventDefault(); // Previene o comportamento padrão do formulário
    if (this.authService.login(this.username, this.password)) {
      // Redirecionar para página após login
      console.log('Login successful');
    } else {
      // Exibir mensagem de erro
      console.error('Login failed: invalid username or password');
    }
  }

  register(): void {
    if (this.authService.register(this.username, this.password)) {
      // Redirecionar para página após registro
      console.log('Registro bem-sucedido');
    } else {
      // Exibir mensagem de erro
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
