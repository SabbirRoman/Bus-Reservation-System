import { Component, Input, OnInit } from '@angular/core';
import { BusService } from '../../services/bus.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mt-4">
      <h5>Available Seats for {{ bus?.busName || 'Bus' }}</h5>
      <div *ngFor="let row of seatRows" class="d-flex mb-2">
        <button *ngFor="let seat of row"
                [disabled]="isBooked(seat)"
                (click)="toggleSeat(seat)"
                [ngClass]="{
                  'btn-success': isSelected(seat),
                  'btn-outline-success': !isSelected(seat) && !isBooked(seat),
                  'btn-danger': isBooked(seat)
                }"
                class="btn m-1">
          {{ seat }}
        </button>
      </div>

      <button class="btn btn-primary mt-3" (click)="showBookingForm()" [disabled]="selectedSeats.length === 0">
        Book Selected Seats
      </button>

      <div *ngIf="showForm" class="mt-3 border p-3">
        <h5>Enter Booking Details</h5>
        <form (ngSubmit)="confirmBooking()" #bookingForm="ngForm">
          <div class="mb-2">
            <label>Name:</label>
            <input type="text" class="form-control" [(ngModel)]="userName" name="userName" required>
          </div>
          <div class="mb-2">
            <label>Phone Number:</label>
            <input type="tel" class="form-control" [(ngModel)]="phoneNumber" name="phoneNumber" required>
          </div>
          <button type="submit" class="btn btn-success" [disabled]="bookingForm.invalid">Confirm Booking</button>
          <button type="button" class="btn btn-secondary ms-2" (click)="cancelBooking()">Cancel</button>
        </form>
      </div>
    </div>
  `
})
export class SeatsComponent implements OnInit {
  @Input() bus: any;
  availableSeats: number[] = [];
  bookedSeats: number[] = [];
  seatRows: number[][] = [];
  selectedSeats: number[] = [];

  showForm = false;
  userName = '';
  phoneNumber = '';

  constructor(private busService: BusService) {}

  ngOnInit(): void {
    if (!this.bus) return;

    this.busService.getAvailableSeats(this.bus.bus.id).subscribe(seats => {
      this.availableSeats = seats;

      const totalSeats = Array.from({ length: 40 }, (_, i) => i + 1);
      this.bookedSeats = totalSeats.filter(seat => !this.availableSeats.includes(seat));

      // Arrange seats in rows of 4
      const allSeats = [...this.availableSeats, ...this.bookedSeats].sort((a, b) => a - b);
      this.seatRows = this.chunkArray(allSeats, 4);
    });
  }

  toggleSeat(seat: number): void {
    if (this.isBooked(seat)) return;

    if (this.isSelected(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  isSelected(seat: number): boolean {
    return this.selectedSeats.includes(seat);
  }

  isBooked(seat: number): boolean {
    return this.bookedSeats.includes(seat);
  }

  showBookingForm() {
    this.showForm = true;
  }

  cancelBooking() {
    this.showForm = false;
    this.userName = '';
    this.phoneNumber = '';
  }

  confirmBooking() {
    if (!this.userName || !this.phoneNumber) {
      alert('Please fill all details');
      return;
    }

    // Get user id from localStorage or dummy value
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) {
      alert('Please login first');
      return;
    }

    this.busService.bookSeats(user.id, this.bus.bus.id, this.selectedSeats).subscribe({
      next: () => {
        this.showForm = false;
        this.showBookingDetailsWindow();
        // Update seats after booking
        this.ngOnInit();
        this.selectedSeats = [];
      },
      error: () => alert('Booking failed')
    });
  }

  showBookingDetailsWindow() {
    const price = this.bus.bus.pricePerSeat * this.selectedSeats.length;
    const source = this.bus.source || 'N/A';
    const destination = this.bus.destination || 'N/A';

    const bookingInfo = `
      <h3>Ticket Booked</h3>
      <p><strong>Name:</strong> ${this.userName}</p>
      <p><strong>Phone No:</strong> ${this.phoneNumber}</p>
      <p><strong>Source:</strong> ${source}</p>
      <p><strong>Destination:</strong> ${destination}</p>
      <p><strong>Selected Seats:</strong> ${this.selectedSeats.join(', ')}</p>
      <p><strong>Price:</strong> ৳${price}</p>
    `;

    const w = window.open('', '', 'width=400,height=400');
    if (w) {
      w.document.write(bookingInfo);
      w.document.close();
    } else {
      alert('Please allow popups for this site');
    }
  }

  private chunkArray(arr: number[], size: number): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}
