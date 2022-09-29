import { Component, OnInit } from '@angular/core';
import { Prices } from '../prices';
import { Availability } from '../availability';
import { Router } from '@angular/router';
import { User } from '../user';
import { AuthService } from '../auth/auth.service';
import { Booking } from '../bookings';
import { Subscription } from 'rxjs';
import { HostelDetailService } from './hostel-detail.service';

@Component({
  selector: 'hostel-hostel-detail',
  templateUrl: './hostel-detail.component.html',
  styleUrls: ['./hostel-detail.component.css'],
})
export class HostelDetailComponent implements OnInit {
  user: User;
  roomBook: Booking;
  prices: Prices;
  booking: Booking;
  room: any[];
  userSubscription: Subscription;
  availability: Availability = {
    boysStandardRooms: 0, // 12
    boysDeluxeRooms: 0, // 15
    boysSuperDeluxeRooms: 0, // 10
    girlsStandardRooms: 0, // 13
    girlsDeluxeRooms: 0, // 15
    girlsSuperDeluxeRooms: 0, // 11
  };

  constructor(
    private authService: AuthService,
    private hostelDetails: HostelDetailService,
    private router: Router
  ) {
    this.authService.findMe().subscribe((user) => (this.user = user));

    console.log(this.user);
  }

  success(roomBook: Booking) {
    this.router.navigate(['/booking']);
  }

  girlSuperDeluxe() {
    if (!this.user) {
      console.log(this.user);
      alert('Login or SignUp to page');
    } else {
      this.roomBook = {
        username: this.user.username,
        roomType: 'Super Deluxe',
        gender: 'female',
      };
      this.hostelDetails.booking(this.roomBook).subscribe(
        (booking) => {
          this.booking = booking;
          //this.router.navigate([''])
        },
        (err) => err
      );
    }
  }

  boySuperDeluxe() {
    if (!this.user) {
      console.log(this.user);
      alert('Login or SignUp to page');
    } else {
      this.roomBook = {
        username: this.user.username,
        roomType: 'Super Deluxe',
        gender: 'male',
      };
      this.hostelDetails.booking(this.roomBook).subscribe(
        (booking) => {
          this.booking = booking;
          //this.router.navigate([''])
        },
        (err) => err
      );
    }
  }

  girlDeluxe() {
    if (!this.user) {
      console.log(this.user);
      alert('Login or SignUp to page');
    } else {
      this.roomBook = {
        username: this.user.username,
        roomType: 'Deluxe',
        gender: 'female',
      };
      this.hostelDetails.booking(this.roomBook).subscribe(
        (booking) => {
          this.booking = booking;
          //this.router.navigate([''])
        },
        (err) => err
      );
    }
  }

  BoyDeluxe() {
    if (!this.user) {
      console.log(this.user);
      alert('Login or SignUp to page');
    } else {
      this.roomBook = {
        username: this.user.username,
        roomType: 'Deluxe',
        gender: 'male',
      };
      this.hostelDetails.booking(this.roomBook).subscribe(
        (booking) => {
          this.booking = booking;
          //this.router.navigate([''])
        },
        (err) => err
      );
    }
  }

  girlStandard() {
    if (!this.user) {
      console.log(this.user);
      alert('Login or SignUp to page');
    } else {
      this.roomBook = {
        username: this.user.username,
        roomType: 'Standard',
        gender: 'female',
      };
      this.hostelDetails.booking(this.roomBook).subscribe(
        (booking) => {
          this.booking = booking;
          //this.router.navigate([''])
        },
        (err) => err
      );
    }
  }

  BoyStandard() {
    if (!this.user) {
      console.log(this.user);
      alert('Login or SignUp to page');
    } else {
      this.roomBook = {
        username: this.user.username,
        roomType: 'Standard',
        gender: 'male',
      };
      this.hostelDetails.booking(this.roomBook).subscribe(
        (booking) => {
          this.booking = booking;
          //this.router.navigate([''])
        },
        (err) => err
      );
    }
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
