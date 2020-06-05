import { Injectable } from '@angular/core';
import { Element } from '@angular/compiler';
import { Observable, of } from 'rxjs';
import { ELEMENT } from './mock-element';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private http: HttpClient) {}

  // TODO bien sur faire une vraie requete, il faudra ^
  /*getElements() {
    return of(ELEMENT);
  }*/

  // pour le moment observable any mais il faudra peut etre preciser
  // le path c'est l'url de l'adresse de l'api
  /* get elements from the collection of medias */
  getElements(
    path: string,
    params: HttpHeaders = new HttpHeaders(),
  ): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { headers: params })
      .pipe(catchError(ApiService.formatErrors));
  }
}
