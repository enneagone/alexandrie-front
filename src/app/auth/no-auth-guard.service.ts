import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtService } from '../core';

@Injectable()
export class NoAuthGuard implements CanActivate {
  private jwtService: JwtService = new JwtService();
  constructor(private router: Router) {}

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.jwtService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
