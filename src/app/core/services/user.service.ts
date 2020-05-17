import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
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
    // tslint:disable-next-line:no-shadowed-variable
    private jwtService: JwtService,
  ) {}

  userKnown() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/user').subscribe(
        (data) => this.setAuth(data.user),
        (err) => this.purgeAuth,
      );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  login(username: string, password: string) {
    const parameters = new HttpParams({
      fromString: 'username=' + username + '&password=' + password,
    });
    return (
      this.apiService
        .post('/public/login', {}, parameters)
        // tslint:disable-next-line:ban-types
        .subscribe((data: Object) => {
          console.log(data);
        })
    );
  }
}
