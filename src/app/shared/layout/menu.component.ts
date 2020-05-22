import { Component } from '@angular/core';
import { JwtService } from '../../core';

@Component({
  selector: 'alx-layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private jwtService: JwtService) {}

  isUserActive() {
    if (this.jwtService.getToken() != null) {
      return true;
    } else {
      return false;
    }
  }
}
