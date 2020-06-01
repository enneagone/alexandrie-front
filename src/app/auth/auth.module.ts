import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RegisterRoutingModule } from './register/register-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [NoAuthGuard, DatePipe],
  exports: [LoginComponent],
})
export class AuthModule {}
