import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { Product } from '@models';
import { ProductService } from '@core-services';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  public isEdited = false;
  public product: Product;
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.productService.getById(params['id']);
      })
    ).subscribe((product: Product) => this.product = product);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public editProduct(form: FormGroup): void {
    if (form.valid) {
      // this.isEdited = true;

      this.productService.edit({
        ...this.product,
        title: form.value.title,
        manufacturer: form.value.manufacturer,
        cost: form.value.cost,
        description: form.value.description
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // this.isEdited = false;
        this.router.navigate(['/admin', 'dashboard']);
      })
    }
  }

}
