import { Component, OnInit } from '@angular/core';

import { JwtService } from './core';

@Component({
  selector: 'alx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'alexandrie-front';
  isOnLogin = true;
  isOnRegister = false;
  constructor(private jwtService: JwtService) {}
}
