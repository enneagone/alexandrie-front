import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'alx-layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private userService: UserService) {}

  autSubscription: Subscription;
  isActive: boolean;

  ngOnInit(): void {
    this.autSubscription = this.userService.isAuthenticated.subscribe(
      (value) => {
        this.isActive = value;
      },
    );
  }
}
