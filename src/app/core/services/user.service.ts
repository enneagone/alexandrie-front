import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  /*
   * maintenant l'adresse est dans le fichier proxy.config.js
   * pour l'une des probleme, il y avait un probleme entre http et httpS
   * et le second avec la requete post, a fonctionné en créant ce fichier de config
   * et il faut demarrer avec ng serve --proxy-config src/proxy.config.json
   * cf, ou j'ai trouvé la soluce : https://stackoverflow.com/questions/60169694/java-rest-call-get-url-neterr-failed
   */
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
  ) {}
  userKnown() {
    if (this.jwtService.getToken()) {
      const headers = new HttpHeaders({
        'Content-Type': 'text',
        'Authorization': 'Bearer ' + this.jwtService.getToken(),
      });
      this.apiService.get('/users/current', headers).subscribe(
        (data) => {
          console.log(data);
          this.setAuth(data);
        },
        (err) => this.purgeAuth,
      );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  login(user: User) {
    const parameters = new HttpParams({
      fromString: 'username=' + user.email + '&password=' + user.password,
    });

    return (
      this.apiService
        .post('/public/users/login', parameters)
        // tslint:disable-next-line:ban-types
        .subscribe(
          (data) => {
            user.token = data;
            this.setAuth(user);
          },
          (error) => console.log(error),
        )
    );
  }

  register(user: User) {
    // console.log('Information : ' + email + ' ' + username + ' ' + password);
    const parameters = new HttpParams({
      fromString:
        'username=' +
        user.username +
        '&email=' +
        user.email +
        '&password=' +
        user.password,
    });
    console.log(' Parameters : ' + parameters);

    return this.apiService.post('/public/users/register', parameters).subscribe(
      (data) => {
        user.token = data;
        this.setAuth(user);
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
