import { Component } from '@angular/core';
import { JwtService } from '../../core';

import {
  faHome,
  faUserAlt,
  faPhotoVideo,
  faSignInAlt,
  faUserPlus,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'alx-layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private jwtService: JwtService) {}

  Home = faHome;
  User = faUserAlt;
  Media = faPhotoVideo;
  SignInAlt = faSignInAlt;
  Register = faUserPlus;
  Info = faInfoCircle;

  isUserActive() {
    return this.jwtService.getToken() != null;
  }
}
