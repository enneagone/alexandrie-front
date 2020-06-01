import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from '../../layout/login-layout/login-layout.component';
import { NoAuthGuard } from '../no-auth-guard.service';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: 'register',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: RegisterComponent,
        canActivate: [NoAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
