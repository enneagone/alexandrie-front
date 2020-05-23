import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService, JwtService, UserService } from './services';
import { HttpTokenInterceptor } from './interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    JwtService,
    UserService,
  ],
  declarations: [],
})
export class CoreModule {}
