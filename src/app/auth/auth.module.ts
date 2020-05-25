import { NgModule } from '@angular/core';

import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { NoAuthGuard } from './no-auth-guard.service';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [AuthRoutingModule, ReactiveFormsModule, SharedModule],
  declarations: [RegisterComponent, LoginComponent],
  providers: [NoAuthGuard],
  exports: [LoginComponent],
})
export class AuthModule {}
