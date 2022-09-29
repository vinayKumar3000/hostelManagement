import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new Subject<User>();
  private id: string;
  private apiUrl = 'http://localhost:5000/api/auth/';

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    const loginCredentials = { username, password };
    // console.log('login credentials', loginCredentials);

    return this.httpClient
      .post<User>(`${this.apiUrl}login`, loginCredentials)
      .pipe(
        switchMap((user) => {
          this.id = user._id;
          this.setUser(user);

          console.log('found user', user);
          return of(user);
        }),
        catchError((err) => {
          console.log(
            `Your login details could not be verified. Please try again`,
            err
          );
          return throwError(
            `Your login details could not be verified. Please try again`
          );
        })
      );
  }

  logout() {
    // remove user from subject
    this.setUser(null);
    // remove token from localStorage

    console.log('user logout successfully');
  }

  get user() {
    return this.user$.asObservable();
  }

  signup(userToSave: any) {
    return this.httpClient.post<any>(`${this.apiUrl}register`, userToSave).pipe(
      switchMap((user) => {
        this.setUser(user);
        this.id = user._id;
        console.log(`user registered successfully`, user);
        return of(user);
      }),
      catchError((err) => {
        console.log(`server error occured`, err);
        return throwError(`Registration failed please contact to admin`);
      })
    );
  }

  findMe() {
    return this.httpClient
      .get<any>(`http://localhost:5000/api/users/${this.id}`)
      .pipe(
        switchMap((user) => {
          this.setUser(user);
          this.id = user._id;
          console.log('Auth service', user);

          return of(user);
        }),
        catchError((err) => {
          console.log(
            `Your login details could not be verified. Please try again`,
            err
          );
          return throwError(
            `Your login details could not be verified. Please try again`
          );
        })
      );
  }

  private setUser(user: any) {
    this.user$.next(user);
  }
}
