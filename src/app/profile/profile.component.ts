import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { UserService } from '../core/services';
import { User } from '../core/models';

@Component({
  selector: 'alx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: User;

  constructor(private userService: UserService) {}

  getProfile() {
    this.userService.getUser().subscribe(
      (user: User) => {
        let date = this.parseDateTime(user.birthDate);
        this.profile = { ...user, birthDate: date };
      },
      (error: Error) => {
        console.log('Failed to retrieve user' + error);
      },
    );
  }

  private parseDateTime(dateTime: string) {
    const date = dateTime.split('T')[0].split('-');
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return `${day}/${month}/${year}`;
  }

  ngOnInit(): void {
    this.getProfile();
  }
}
