import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private static formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { headers: params })
      .pipe(catchError(ApiService.formatErrors));
  }

  // tslint:disable-next-line:ban-types
  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(ApiService.formatErrors));
  }

  post(path: string, parametter: HttpParams): Observable<any> {
    return this.http
      .post(
        `${environment.api_url}${path}`,
        {},
        { params: parametter, responseType: 'text' },
      )
      .pipe(catchError(ApiService.formatErrors));
  }

  // tslint:disable-next-line:ban-types
  postWithRegister(path: string, body: any): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      {
        responseType: 'text',
      },
    );
  }

  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(ApiService.formatErrors));
  }
}
