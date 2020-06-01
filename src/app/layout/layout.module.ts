import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  declarations: [LoginLayoutComponent, DefaultLayoutComponent],
})
export class LayoutModule {}
