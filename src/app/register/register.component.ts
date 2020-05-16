import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @ts-ignore
import { SelectItem } from 'primeng/primeng';
import { first } from 'rxjs/operators';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

    private authenticationService: AuthenticationService,
  ) {
    for (let i = 0; i < 40; ++i) {
      // @ts-ignore
      this.years.push(this.currentDate.getFullYear() - i);
    }
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.numbers = new Array(31)
      .fill(undefined, undefined, undefined)
      .map((x, i) => i);
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.register(
      this.f.email.value,
      this.f.username.value,
      this.f.password.value,
    );
  }
}
