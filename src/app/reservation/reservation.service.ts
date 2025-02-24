import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];


  constructor() {
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [] // if it's not null then parse, otherwise set as an empty array
  }

  // CRUD operations below
  getReservations(): Reservation[]{
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined{
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void{
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index,1) // splice at index and remove one element, remove that element at index
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  updateReservation(id:string, updatedReservation: Reservation): void{
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
}
