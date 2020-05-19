import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService, AuthGuard, JwtService, UserService } from './services';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    AuthGuard,
    JwtService,
    UserService,
  ],
  declarations: [],
})
export class CoreModule {}
