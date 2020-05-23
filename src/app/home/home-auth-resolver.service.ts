import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { UserService } from '../core';

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private router: Router, private userService: UserService) {}

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.userService.loggedIn.subscribe((value) => {
      return value;
    });
  }
}
