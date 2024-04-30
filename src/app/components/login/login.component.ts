import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private authService: AuthService) { }

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      // Redirecionar para página após login
    } else {
      // Exibir mensagem de erro
    }
  }

}
