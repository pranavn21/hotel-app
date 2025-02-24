import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3000"
  private reservations: Reservation[] = [];


constructor(private http: HttpClient) {
}

  // CRUD operations below
  getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + "/reservations/"+id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
  }

  deleteReservation(id: string): void{
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index,1) // splice at index and remove one element, remove that element at index
  }

  updateReservation(id:string, updatedReservation: Reservation): void{
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedReservation;
  }
}
