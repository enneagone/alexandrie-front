import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  // tslint:disable-next-line:ban-types
  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  // tslint:disable-next-line:ban-types
  post(path: string, body: Object = {}, parameters: string): Observable<any> {
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body), {
        params: parameters,
        responseType: 'text',
      })
      .pipe(catchError(this.formatErrors));
  }

  // tslint:disable-next-line:ban-types
  delete(path: string): Observable<any> {
    return this.http
      .delete(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }
}
