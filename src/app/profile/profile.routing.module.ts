import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { HomeAuthResolver } from '../home/home-auth-resolver.service';
import { DefaultLayoutComponent } from '../layout/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: 'account',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
        canActivate: [HomeAuthResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
