import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h3>Register</h3>
      <input class="form-control" [(ngModel)]="user.email" placeholder="Email" />
      <input class="form-control mt-2" [(ngModel)]="user.password" type="password" placeholder="Password" />
      <button class="btn btn-success mt-3" (click)="onRegister()">Register</button>
    </div>
  `
})
export class RegisterComponent {
  user = { email: '', password: '' };
  errorMsg: string | undefined;

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
  this.auth.signup(this.user).subscribe({
    next: (res: any) => {
      alert('Registration Successful');
      localStorage.setItem('user', JSON.stringify(res.data));
      this.router.navigateByUrl('/');
    },
    error: (err) => {
      if (err.status === 409 && err.error?.message) {
        alert(err.error.message); // Show "Email already registered"
      } else {
        alert('Registration Failed');
      }
    }
  });
}


}
