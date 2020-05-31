import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { HomeAuthResolver } from '../home/home-auth-resolver.service';

const routes: Routes = [
  {
    path: 'account',
    component: ProfileComponent,
    canActivate: [HomeAuthResolver],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
