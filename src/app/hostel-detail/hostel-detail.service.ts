import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Booking } from '../bookings';
import { Prices } from '../prices';

@Injectable({
  providedIn: 'root',
})
export class HostelDetailService {
  private prices$ = new Subject<Prices>();
  private booking$ = new Subject<any>();
  private apiUrl = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {}

  get price() {
    return this.prices$.asObservable();
  }

  get bookings() {
    return this.booking$.asObservable();
  }

  findHostelPriceDetails() {
    return this.httpClient
      .get<any>(`${this.apiUrl}prices/findHostelPriceDetails`)
      .pipe(
        switchMap(({ price }) => {
          this.setPrice(price);
          // console.log('found price detalis done', price);
          return of(price);
        }),
        catchError((err) => {
          return throwError(
            `Your Hostel Price Details not fetch. Please try again`
          );
        })
      );
  }

  booking(roomBook: Booking) {
    return this.httpClient
      .post<Booking>(`${this.apiUrl}bookings`, roomBook)
      .pipe(
        switchMap((booking) => {
          this.setBooking(booking);
          console.log(booking);
          return of(booking);
        }),
        catchError((err) => {
          return throwError(`Your Booking Details not fetch. Please try again`);
        })
      );
  }

  private setPrice(price: any) {
    this.prices$.next(price);
  }
  private setBooking(bookings: any) {
    this.booking$.next(bookings);
  }
}
