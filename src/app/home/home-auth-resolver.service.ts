import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { JwtService } from '../core';
import { take } from 'rxjs/operators';

@Injectable()
export class HomeAuthResolver implements Resolve<boolean> {
  constructor(private router: Router, private jwtService: JwtService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.jwtService.getToken()) {
      return false;
    } else {
      return true;
    }
  }
}
