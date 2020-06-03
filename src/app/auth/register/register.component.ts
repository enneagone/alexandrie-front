import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NotifyService } from 'enneagone-angular-ds';
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
  messageFailed = 'Invalid field';
  loginForm: FormGroup;
  submitted = false;
  error: string;
  numbers: SelectItem[] = [];
  // TODO creer un composant angular pour la selection dans date
  mounths = [
    { value: 1, text: 'Janvier' },
    { value: 2, text: 'Février' },
    { value: 3, text: 'Mars' },
    { value: 4, text: 'Avril' },
    { value: 5, text: 'Mai' },
    { value: 6, text: 'Juin' },
    { value: 7, text: 'Juillet' },
    { value: 8, text: 'Août' },
    { value: 9, text: 'Septembre' },
    { value: 10, text: 'Octobre' },
    { value: 11, text: 'Novembre' },
    { value: 12, text: 'Décembre' },
  ];
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
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
    private notifier: NotifyService,
  ) {
    // TODO creer un composant angular pour la selection dans date
    for (let i = 0; i < 100; ++i) {
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
    this.user.picture = 'none';
    this.f.firstName.setValue(this.user.firstName);
    this.f.lastName.setValue(this.user.lastName);
    this.f.country.setValue(this.user.country);
    this.f.city.setValue(this.user.city);
    this.f.email.setValue(this.user.email);
    this.f.username.setValue(this.user.username);
    this.f.password.setValue(this.user.password);
    if (this.loginForm.invalid) {
      this.notifier.notify(this.messageFailed, 2);
      return;
    }
    const birthDate =
      this.f.year.value + '-' + this.f.mounth.value + '-' + this.f.day.value;
    this.user.birthDate = this.datePipe.transform(
      birthDate,
      'yyyy-MM-dd',
    ) as string;
    this.authenticationService.register(this.user);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
