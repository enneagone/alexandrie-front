import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService, AuthGuard, JwtService, UserService } from './services';

@NgModule({
  imports: [CommonModule],
  providers: [ApiService, AuthGuard, JwtService, UserService],
  declarations: [],
})
export class CoreModule {}
