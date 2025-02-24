import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  /**
   *
   */
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){}

  
  // Function that runs on the form initialization
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required], // check-in date needs to have a value
      checkOutDate: ['', Validators.required], 
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]], 
      roomNumber: ['', Validators.required] 
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id')

    if(id){
      // Update
      this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation)
          this.reservationForm.patchValue(reservation) // if you find a value for the id, then fill/"patch" the value. otherwise, show the blank form  
      })

    }
  }

  onSubmit(){
    if(this.reservationForm.valid){
      
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id')

      if(id){
        // Update
        this.reservationService.updateReservation(id, reservation)
      }  else{
        // New
        this.reservationService.addReservation(reservation)
      }

      this.router.navigate(['/list']) // we want the user to navigate to /list
      console.log("Valid.")
    }
  }
}
