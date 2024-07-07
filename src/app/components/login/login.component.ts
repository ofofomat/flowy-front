import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlowyUser } from '../../models/FlowyUser.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  isLogin = true;
  passwordFieldType = 'password';
  hide = true;
  public userForm = {} as FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userEmail: ['', Validators.required]
    });
  }

  login(event: Event): void {
    event.preventDefault();
    const { userName, userPassword } = this.userForm.value; 
    this.authService.login(userName, userPassword).subscribe(
      (res) => {
        console.log('Login bem-sucedido', res);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.error('Login falhou: ', err);
      }
    );
  }

  register(event: Event): void {
    event.preventDefault();
    const user: FlowyUser = this.userForm.value;
    this.authService.register(user).subscribe(
      (res) => {
        console.log('Registro bem-sucedido', res);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.error('Register failed: ', err);
      }
    );
  }

  toggleForm(isLogin: boolean): void {
    if (isLogin === this.isLogin) return;
    this.isLogin = isLogin;
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
