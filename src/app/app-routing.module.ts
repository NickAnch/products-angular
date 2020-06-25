import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreLayoutComponent } from './shared/components';
import { HomeComponent, ProductPageComponent } from '@core-pages';


const routes: Routes = [
  {
    path: '', component: CoreLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'product/:id', component: ProductPageComponent }
    ]
  },
  {
    path: 'admin', loadChildren: './admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
