import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
    LoadingComponent,
  ],
  declarations: [
    LoadingComponent,
  ]
})
export class SharedModule { }
