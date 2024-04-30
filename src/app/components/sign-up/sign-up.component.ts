import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  user: User = { id: 0, username: '', password: '', email: '' };

  constructor(private authService: AuthService) { }

  signup(): void {
    this.authService.register(this.user);
    // Lógica para redirecionar após o cadastro
  }

}
