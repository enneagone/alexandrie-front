import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly loggedInSubject: ReplaySubject<boolean> = new ReplaySubject(
    1,
  );
  readonly loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

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
    this.loggedInSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    this.loggedInSubject.next(false);
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

  register(username: string, email: string, password: string) {
    const parameters = new HttpParams({
      fromString:
        'username=' + username + '&email=' + email + '&password=' + password,
    });

    return this.apiService.post('/public/users/register', parameters).subscribe(
      (data) => {
        this.setAuth(data.toString());
      },
      (error) => this.purgeAuth,
    );
  }
}
