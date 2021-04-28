import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent, ProductComponent } from '@shared-components';
import { SearchPipe } from '@shared-pipes';

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
    SearchPipe,
  ],
  declarations: [
    LoadingComponent,
    ProductComponent,
    SearchPipe,
  ]
})
export class SharedModule { }
