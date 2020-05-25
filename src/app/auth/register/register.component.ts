import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import { SelectItem } from 'primeng/primeng';
import { User } from '../../core/models';
import { map } from 'rxjs/operators';

// tslint:disable-next-line:prettier
@Component({
  selector: 'alx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  numbers: SelectItem[] = [];
  // TODO creer un composant angular pour la selection dans date
  mounths: SelectItem[] = [];
  years: Array<Int32Array>[] = [];
  currentDate = new Date();
  user: User = new (class implements User {
    firstName: string;
    lastName: string;
    picture: string;
    birthDate: string;
    city: string;
    country: string;
    email: string;
    password: string;
    username: string;
  })();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
  ) {
    // TODO creer un composant angular pour la selection dans date
    for (let i = 0; i < 40; ++i) {
      // @ts-ignore
      this.years.push(this.currentDate.getFullYear() - i);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.numbers = new Array(32).fill(undefined, 1, undefined).map((x, i) => i);
    this.numbers.shift();
    this.mounths = new Array(12).fill(undefined, 1, undefined).map((x, i) => i);
    this.mounths.shift();
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      day: ['', Validators.required],
      mounth: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      alert('Erreur ! Information menquante dans le formulaire');
      return;
    }
    this.loading = true;

    const today =
      this.f.year.value + '-' + this.f.mounth.value + '-' + this.f.day.value;
    this.user.firstName = this.f.firstName.value;
    this.user.lastName = this.f.lastName.value;
    // @ts-ignore
    this.user.birthDate = new Date(today);
    this.user.country = this.f.country.value;
    this.user.city = this.f.city.value;
    this.user.email = this.f.email.value;
    this.user.picture = 'none';
    this.user.username = this.f.username.value;
    this.user.password = this.f.password.value;

    this.authenticationService.register(this.user);
    if (
      this.authenticationService.isAuthenticated.pipe(map((isAuth) => isAuth))
    ) {
      this.router.navigateByUrl('/home');
    } else {
      alert('register failed');
      this.loginForm.reset();
    }
  }
}
