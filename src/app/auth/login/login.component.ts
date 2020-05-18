import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../core/models';

@Component({
  selector: 'alx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  private currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: UserService,
  ) {
    if (this.authenticationService.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      password: ['', Validators.required],
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
    this.currentUser.email = this.f.Email.value;
    this.currentUser.password = this.f.password.value;
    this.authenticationService.login(this.currentUser);
  }
}
