import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { JwtService } from '../core';
import { UserService } from '../core/services';

@Injectable()
export class HomeAuthResolver implements CanActivate {
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private authenticationService: UserService,
  ) {}

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authenticationService.userKnown();
    if (this.jwtService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
