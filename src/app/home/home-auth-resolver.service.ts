import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { JwtService } from '../core';

@Injectable()
export class HomeAuthResolver implements CanActivate {
  constructor(private router: Router, private jwtService: JwtService) {}

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
