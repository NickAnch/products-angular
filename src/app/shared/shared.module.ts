import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent, ProductComponent } from '@shared-components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    HttpClientModule,
    LoadingComponent,
    ProductComponent,
  ],
  declarations: [
    LoadingComponent,
    ProductComponent,
  ]
})
export class SharedModule { }
