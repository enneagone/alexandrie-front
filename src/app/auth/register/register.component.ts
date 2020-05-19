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
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  numbers: SelectItem[] = [];
  // TODO creer un composant angular pour la selection dans date
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
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      alert('Erreur ! Information menquante dans le formulaire');
      return;
    }
    this.loading = true;

    this.authenticationService.register(
      this.f.username.value,
      this.f.email.value,
      this.f.password.value,
    );
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
