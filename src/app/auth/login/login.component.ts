import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from 'enneagone-angular-ds';

@Component({
  selector: 'alx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  messageFailed = 'Invalid field';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  username = '';
  password = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private authenticationService: UserService,
    private notifier: NotifyService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.f.username.setValue(this.username);
    this.f.password.setValue(this.password);
    if (this.loginForm.invalid) {
      this.notifier.notify(this.messageFailed, 2);
      return;
    }
    this.authenticationService.login(
      this.f.username.value,
      this.f.password.value,
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
