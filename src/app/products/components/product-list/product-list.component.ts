import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from './../../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage: string;
  @Input() displayCode: boolean;
  @Input() products: Product[];
  @Input() selectedProduct: Product;

  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter<Product>();
  @Output() selected = new EventEmitter<Product>();

  constructor() { }

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(value: Product): void {
    this.initializeNewProduct.emit(value);
  }

  productSelected(value: Product): void {
    this.selected.emit(value);
  }
}