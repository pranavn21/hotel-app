import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) {

    
  }

  // Function that runs on the form initialization
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required], // check-in date needs to have a value
      checkOutDate: ['', Validators.required], 
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]], 
      roomNumber: ['', Validators.required] 
    })
  }

  onSubmit(){
    if(this.reservationForm.valid){
      console.log("Valid.")
    }
  }
}
