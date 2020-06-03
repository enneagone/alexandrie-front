import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../core/services';
import { User } from '../core/models';
import { NotifyService } from 'enneagone-angular-ds';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'alx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit {
  error: Error;
  @Input()
  profile: User;

  profileForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['XXXXX', Validators.required],
    date: ['', Validators.required],
    aliases: this.fb.array([this.fb.control('')]),
  });

  constructor(
    private notifier: NotifyService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {}

  getProfile() {
    this.userService.getUser().subscribe(
      (user: User) => {
        console.log(user);
        const date = this.parseDateTime(user.birthDate);
        this.profile = { ...user, birthDate: date };
        this.updateForm();
      },
      (error: Error) => {
        this.error = error;
        console.log('Failed to retrieve user' + error);
      },
    );
  }

  private parseDateTime(dateTime: string) {
    const date = dateTime.split('T')[0].split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return `${year}-${month}-${day}`;
  }

  private updateForm() {
    console.log('Updating form');
    this.profileForm.patchValue({
      firstname: this.profile.firstName,
      lastname: this.profile.lastName,
      email: this.profile.email,
      city: this.profile.city,
      country: this.profile.country,
      username: this.profile.username,
      date: this.profile.birthDate,
    });
  }

  onSubmit() {
    console.log('Submitting');
    console.log(this.profileForm.value);
    const form = new FormData();
    form.append('user', `${this.profileForm.value}`);
    this.userService.postUser(form).subscribe(
      (data) => {
        console.log(data);
      },
      (error: Error) => {
        this.error = error;
        console.log('Failed to retrieve user' + error);
      },
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getProfile();
  }
}
