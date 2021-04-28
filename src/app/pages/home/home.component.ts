import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '@models';
import { ProductService } from '@core-services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public products$: Observable<Product[]>;
  public filter = '';

  constructor(
    private productService: ProductService,
  ) {
    this.products$ = this.productService.getAll();
  }

}
