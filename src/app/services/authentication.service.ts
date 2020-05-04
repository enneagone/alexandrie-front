import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private config = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem(`currentUser`) as string),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.config}/public/users/login`, { username, password })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
      );
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(email: string, username: string, password: string) {
    const params = new URLSearchParams();
    params.set('username', username);
    params.set('email', email);
    params.set('password', password);

    return this.http
      .post(this.config + `/public/users/register`, { params })
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log('echec');
        },
      );
  }
}
