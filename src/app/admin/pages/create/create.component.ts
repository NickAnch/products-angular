import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Product } from '@models';
import { ProductService } from '@core-services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnDestroy {
  private destroy$ = new Subject();

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public createProduct(form: FormGroup): void {
    if (form.valid) {
      const product: Product = form.value;
      product.date = new Date();

      this.productService.create(product)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          form.reset();
          this.router.navigate(['/admin', 'dashboard']);
        })
    }
  }

}
