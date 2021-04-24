import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Product } from '@models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product = null;
  @Output() saveProduct = new EventEmitter<FormGroup>();

  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm(this.product);
  }

  private initForm(product: Product): void {
    this.form = new FormGroup({
      title: new FormControl(product && product.title, [Validators.required]),
      manufacturer: new FormControl(product && product.manufacturer, [Validators.required]),
      cost: new FormControl(product && product.cost, [Validators.required]),
      description: new FormControl(product && product.description, [Validators.required]),
    })
  }

  public hasError(field: string): boolean {
    return this.form.get(field).invalid &&
      (this.form.get(field).touched || this.form.get('title').dirty);
  }

}
