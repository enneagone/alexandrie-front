import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<boolean>;
  public currentUser: Observable<boolean>;

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
    private router: Router,
    private jwtService: JwtService,
  ) {
    this.currentUserSubject = new BehaviorSubject<boolean>(
      // @ts-ignore
      localStorage.getItem('jwtToken'),
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): boolean {
    return this.currentUserSubject.value;
  }

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
    this.currentUserSubject.next(true);
    this.router.navigate(['/home']);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.currentUserSubject.next(false);
    this.jwtService.destroyToken();
    this.router.navigate(['/login']);
  }

  login(username: string, password: string) {
    const parameters = new HttpParams({
      fromString: 'username=' + username + '&password=' + password,
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
