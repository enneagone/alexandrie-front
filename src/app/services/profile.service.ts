import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Profile } from '../profile/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  fetchProfile(): Observable<Profile> {
    const token = localStorage.getItem('currentUser');
    return this.httpClient
      .get<Profile>(`http://localhost:8080/users/current`)
      .pipe(tap((_) => console.log(`fetched profile ${name}`)));
  }
}
