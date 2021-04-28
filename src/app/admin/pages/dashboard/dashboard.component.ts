import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Product } from '@models';
import { ProductService } from '@core-services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  private destroy$ = new Subject();
  public filter = '';

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getProducts(): void {
    this.productService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: Product[]) => this.products = products);
  }

  public remove(id: string): void {
    this.productService.remove(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      })
  }

}
