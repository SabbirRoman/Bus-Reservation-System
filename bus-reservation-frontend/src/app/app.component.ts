import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgIf],
  template: `
  
  <nav class="navbar navbar-expand-lg shadow-sm" style="background-color: #ffffff;">
    <div class="container-fluid px-4">
      <a class="navbar-brand fw-bold text-success" routerLink="/" style="font-size: 1.4rem;">
        Bus Reservation
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" routerLink="/" routerLinkActive="active">Search</a>
          </li>
          <li class="nav-item" *ngIf="!user">
            <a class="nav-link" routerLink="/login" routerLinkActive="active">Login</a>
          </li>
          <li class="nav-item" *ngIf="!user">
            <a class="nav-link" routerLink="/register" routerLinkActive="active">Register</a>
          </li>
          <li class="nav-item" *ngIf="user">
            <a class="nav-link text-danger" href="#" (click)="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-outlet></router-outlet>
`

})
export class AppComponent {
  get user() {
    return localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    window.location.reload();
  }
}
