import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { DefaultLayoutComponent } from '../layout/default-layout/default-layout.component';
import { CollectionDisplayComponent } from '../collection-display/collection-display.component';

const routes: Routes = [
  {
    path: 'home',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [HomeAuthResolver],
      },
      {
        path: 'collection',
        component: CollectionDisplayComponent,
        canActivate: [HomeAuthResolver],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
