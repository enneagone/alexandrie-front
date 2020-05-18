import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import { SelectItem } from 'primeng/primeng';
import { User } from '../../core/models';

// tslint:disable-next-line:prettier
@Component({
  selector: 'alx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
  ) {
    for (let i = 0; i < 40; ++i) {
      // @ts-ignore
      this.years.push(this.currentDate.getFullYear() - i);
    }
    this.authenticationService.userKnown();
  }

  get f() {
    return this.loginForm.controls;
  }
  private currentUser: User;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  returnUrl: string;
  numbers: SelectItem[] = [];
  mounths = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: Array<Int32Array>[] = [];
  currentDate = new Date();

  ngOnInit(): void {
    this.numbers = new Array(31)
      .fill(undefined, undefined, undefined)
      .map((x, i) => i);
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      day: ['', Validators.required],
      mounth: ['', Validators.required],
      year: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.currentUser = new (class implements User {
      birthDate: Array<string>;
      city: string;
      country: string;
      email: string;
      password: string;
      token: string;
      username: string;
    })();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Erreur !');
      return;
    }
    this.currentUser.username = this.f.username.value;
    this.currentUser.email = this.f.email.value;
    this.currentUser.password = this.f.password.value;

    this.currentUser.birthDate = new Array<string>();
    this.currentUser.birthDate.push(
      this.f.day.value,
      this.f.mounth.value,
      this.f.year.value,
    );
    this.currentUser.country = this.f.country.value;
    this.currentUser.city = this.f.city.value;
    this.loading = true;
    this.authenticationService.register(this.currentUser);
  }
}
