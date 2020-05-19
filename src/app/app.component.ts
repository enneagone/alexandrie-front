import { Component, OnInit } from '@angular/core';

import { UserService } from './core';

@Component({
  selector: 'alx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'alexandrie-front';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // TODO redirection on home page with userService
  }
}
