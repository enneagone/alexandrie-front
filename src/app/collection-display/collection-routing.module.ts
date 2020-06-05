import { NgModule } from '@angular/core';
import { DefaultLayoutComponent } from '../layout/default-layout/default-layout.component';
import { CollectionDisplayComponent } from './collection-display.component';
import { HomeAuthResolver } from '../home/home-auth-resolver.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'collection',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
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
export class CollectionRoutingModule {}
