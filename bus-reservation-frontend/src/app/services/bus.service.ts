import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BusService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  searchRoutes(source: string, destination: string): Observable<any[]> {
    const params = new HttpParams()
      .set('source', source)
      .set('destination', destination);
    return this.http.get<any[]>(`${this.baseUrl}/api/routes`, { params });
  }

  getAvailableSeats(busId: number): Observable<number[]> {
    const params = new HttpParams().set('busId', busId.toString());
    return this.http.get<number[]>(`${this.baseUrl}/api/bookings/available-seats`, { params });
  }

  bookSeats(userId: number, busId: number, selectedSeats: number[]): Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    const body = { busId, selectedSeats };
    return this.http.post(`${this.baseUrl}/api/bookings`, body, { params });
  }
}
