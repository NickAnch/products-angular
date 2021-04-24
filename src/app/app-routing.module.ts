import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreLayoutComponent } from '@shared-components';
import {
  ErrorPageComponent,
  HomeComponent,
  ProductPageComponent,
} from '@core-pages';


const routes: Routes = [
  {
    path: '', component: CoreLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'error', component: ErrorPageComponent }
    ]
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
