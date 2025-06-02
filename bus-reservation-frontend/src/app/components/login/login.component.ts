import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh; background-color: #f7f9fc;">
    <div class="card shadow p-4" style="width: 100%; max-width: 420px; border: none; border-radius: 12px;">
      <div class="text-center mb-4">
        <img src="https://www.shohoz.com/images/logo.svg" alt="Logo" style="height: 40px;" />
        <h4 class="mt-3" style="font-weight: 600;">Login to Your Account</h4>
      </div>

      <div class="form-group mb-3">
        <label style="font-weight: 500;">Email</label>
        <input
          type="email"
          class="form-control"
          [(ngModel)]="login.email"
          placeholder="Enter your email"
          style="border-radius: 8px;"
        />
      </div>

      <div class="form-group mb-4">
        <label style="font-weight: 500;">Password</label>
        <input
          type="password"
          class="form-control"
          [(ngModel)]="login.password"
          placeholder="Enter your password"
          style="border-radius: 8px;"
        />
      </div>

      <button class="btn btn-success w-100" style="border-radius: 8px;" (click)="onLogin()">
        Login
      </button>

      <p class="text-center mt-3" style="font-size: 14px;">
        Don't have an account?
        <a routerLink="/register" style="color: #28a745;">Register here</a>
      </p>
    </div>
  </div>
`

})

export class LoginComponent {
  login = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.login).subscribe({
      next: (res: any) => {
        alert('Login Successful');
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res?.data || res));
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login Failed');
      }
    });
  }
}
