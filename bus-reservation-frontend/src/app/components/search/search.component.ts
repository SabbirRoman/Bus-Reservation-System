import { Component } from '@angular/core';
import { BusService } from '../../services/bus.service';
import { CommonModule } from '@angular/common';
import { SeatsComponent } from '../seats/seats.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, SeatsComponent],
  template: `
    <div class="container mt-4">
      <h3>Search Buses</h3>
      <div class="row mb-3">
        <div class="col-md-3">
          <input class="form-control" [(ngModel)]="source" placeholder="Source">
        </div>
        <div class="col-md-3">
          <input class="form-control" [(ngModel)]="destination" placeholder="Destination">
        </div>
        <div class="col-md-3">
          <input type="date" class="form-control"
            [(ngModel)]="journeyDate"
            [min]="today"
            [max]="maxDate"
            placeholder="Journey Date">
        </div>
        <div class="col-md-3">
          <button class="btn btn-primary w-100" (click)="onSearch()">Search</button>
        </div>
      </div>

      <div *ngIf="routes.length > 0">
        <h5>Available Buses</h5>
        <ul class="list-group">
          <li *ngFor="let route of routes" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {{ route.bus.busName }} - ৳{{ route.bus.pricePerSeat }}
            </div>
            <button class="btn btn-sm btn-outline-success" (click)="selectBus(route)">View Seats</button>
          </li>
        </ul>
      </div>

      <app-seats *ngIf="selectedBus" [bus]="selectedBus"></app-seats>
    </div>
  `
})
export class SearchComponent {
  source = '';
  destination = '';
  journeyDate: string = '';
  routes: any[] = [];
  selectedBus: any = null;

  today: string = new Date().toISOString().split('T')[0];
  maxDate: string = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  constructor(private busService: BusService) {}

  onSearch() {
    if (!this.source || !this.destination || !this.journeyDate) {
      alert('Please fill source, destination and journey date');
      return;
    }

    this.busService.searchRoutes(this.source, this.destination).subscribe({
      next: (res: any) => {
        this.routes = res || [];
        if (this.routes.length === 0) {
          alert('No buses available for this route');
        }
        this.selectedBus = null;
      },
      error: () => alert('Failed to fetch routes')
    });
  }

  selectBus(route: any) {
    this.selectedBus = route;
  }
}
