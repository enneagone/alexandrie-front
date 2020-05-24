import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
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
      this.apiService.get('/users/current').subscribe(
        (data) => {
          this.setAuth(data);
        },
        (err) => this.purgeAuth,
      );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(token: string) {
    this.jwtService.saveToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    this.isAuthenticatedSubject.next(false);
  }

  login(email: string, password: string) {
    const parameters = new HttpParams({
      fromString: 'username=' + email + '&password=' + password,
    });

    return this.apiService.post('/public/users/login', parameters).subscribe(
      (data) => {
        this.setAuth(data);
      },
      (err) => this.purgeAuth,
    );
  }

  register(user: User) {
    return this.apiService
      .postWithRegister('/public/users/register', user)
      .subscribe(
        (data) => {
          this.setAuth(data.toString());
        },
        (error) => this.purgeAuth,
      );
  }
}
