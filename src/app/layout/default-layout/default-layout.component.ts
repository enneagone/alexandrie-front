import { Component } from '@angular/core';
import { JwtService } from '../../core';

import {
  faHome,
  faUserAlt,
  faPhotoVideo,
  faSignInAlt,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'alx-layout-menu',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  constructor() {}

  Home = faHome;
  User = faUserAlt;
  Media = faPhotoVideo;
  SignInAlt = faSignInAlt;
  Info = faInfoCircle;
}
