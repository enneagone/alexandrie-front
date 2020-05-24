import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { JwtService } from '../core';

@Injectable()
export class InfoAuthResolver implements Resolve<boolean> {
  constructor(private router: Router, private jwtService: JwtService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtService.getToken()) {
      return true;
    } else {
      return true;
    }
  }
}
