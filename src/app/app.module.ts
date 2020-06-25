import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import {
  CoreLayoutComponent,
  ProductComponent,
} from './shared/components';
import { AuthInterceptor } from '@core-services';
import {
  HomeComponent,
  ProductPageComponent,
} from '@core-pages';

const INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
}

@NgModule({
  declarations: [
    AppComponent,
    CoreLayoutComponent,
    HomeComponent,
    ProductPageComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
