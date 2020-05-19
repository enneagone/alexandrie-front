import { NgModule } from '@angular/core';

import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { NoAuthGuard } from './no-auth-guard.service';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [AuthRoutingModule, CommonModule, ReactiveFormsModule],
  declarations: [RegisterComponent, LoginComponent],
  providers: [NoAuthGuard],
  exports: [LoginComponent],
})
export class AuthModule {}
