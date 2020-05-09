import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { element } from 'protractor';
import { query } from '@angular/animations';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  /*
   * maintenant l'adresse est dans le fichier proxy.config.js
   * pour l'une des probleme, il y avait un probleme entre http et httpS
   * et le second avec la requete post, a fonctionné en créant ce fichier de config
   * et il faut demarrer avec ng serve --proxy-config src/proxy.config.json
   * cf, ou j'ai trouvé la soluce : https://stackoverflow.com/questions/60169694/java-rest-call-get-url-neterr-failed
   */
  private config = '';

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
    const parameters = new HttpParams({
      fromString: 'username=' + username + '&password=' + password,
    });
    return this.http
      .post(
        `/public/users/login`,
        {},
        { params: parameters, responseType: 'text' },
      )
      .subscribe(
        (user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        },
        (error) => {
          /* ca marche mais ca passe quand meme dans echec :-/ */
          console.log('echec du login : ', error);
        },
      );
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  register(email: string, username: string, password: string) {
    console.log('Information : ' + email + ' ' + username + ' ' + password);

    // On recupere nos informations sous forme de string, pour les caster dans le bon format on doit le faire de cette
    // façon :
    // https://www.tektutorialshub.com/angular/angular-pass-url-parameters-query-strings/#http-parameters-from-a-string

    const parameters = new HttpParams({
      fromString:
        'username=' + username + '&email=' + email + '&password=' + password,
    });

    // verification du corps des données
    // console.log(parameters.toString());

    return this.http
      .post(`/public/users/register`, {}, { params: parameters })
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          /* ca marche mais ca passe quand meme dans echec :-/ */
          console.log('echec du register : ', error);
        },
      );
  }
}
