import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'alx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: Profile;

  constructor(private profileService: ProfileService) {}

  getProfile() {
    this.profileService
      .fetchProfile()
      .subscribe((profile) => (this.profile = profile));
  }

  ngOnInit(): void {
    this.getProfile();
  }
}
