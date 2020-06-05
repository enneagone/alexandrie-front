import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
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
  @ViewChild('imgProfile') imgProfile: ElementRef;
  error: Error;
  @Input()
  profile: User;
  imageProfile = 'assets/default-profile.png';

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
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
        const date = this.parseDateTime(user.birthDate);
        this.profile = { ...user, birthDate: date };
        this.updateForm();
        if (this.profile.image !== null) {
          this.userService.getUserImage(this.profile.image).subscribe(
            (blob: Blob) => {
              this.setImage(blob);
            },
            (error: Error) => {
              this.error = error;
            },
          );
        }
      },
      (error: Error) => {
        this.error = error;
      },
    );
  }

  setImage(blob: Blob) {
    const urlCreator = window.URL || window.webkitURL;
    this.imgProfile.nativeElement.src = urlCreator.createObjectURL(blob);
  }

  private parseDateTime(dateTime: string) {
    const date = dateTime.split('T')[0].split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return `${year}-${month}-${day}`;
  }

  private updateForm() {
    this.profileForm.patchValue({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      email: this.profile.email,
      city: this.profile.city,
      country: this.profile.country,
      username: this.profile.username,
      date: this.profile.birthDate,
      password: this.profile.password,
    });
  }
  createFormDataUser() {
    const form = new FormData();
    const wrapperUser = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      birthDate: this.profileForm.value.date,
      country: this.profileForm.value.country,
      city: this.profileForm.value.city,
      email: this.profileForm.value.email,
      username: this.profileForm.value.username,
      password: this.profileForm.value.password,
    };

    form.append('user', JSON.stringify(wrapperUser));
    return form;
  }
  updateUser(form: FormData) {
    this.userService.updateUser(form).subscribe(
      (user: User) => {
        const date = this.parseDateTime(user.birthDate);
        this.profile = { ...user, birthDate: date };
        this.notifier.notify('Profile updated', 1);
      },
      (error: Error) => {
        this.error = error;
        this.notifier.notify(this.error.message, 2);
      },
    );
  }
  onSubmit() {
    const form = this.createFormDataUser();
    this.updateUser(form);
  }

  onFileChange($event: { target: { files: string | any[] } }) {
    if ($event.target.files && $event.target.files.length) {
      const [file] = $event.target.files;
      const form = this.createFormDataUser();
      form.append('image', file);
      this.updateUser(form);
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getProfile();
  }
}
