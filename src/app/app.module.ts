import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CoreLayoutComponent } from '@shared-components';
import { AuthInterceptor } from '@core-services';
import {
  HomeComponent,
  ProductPageComponent,
  ErrorPageComponent,
} from '@core-pages';

const INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    CoreLayoutComponent,
    HomeComponent,
    ErrorPageComponent,
    ProductPageComponent,
  ],
  providers: [INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
