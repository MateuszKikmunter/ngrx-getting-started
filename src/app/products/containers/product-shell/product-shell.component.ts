import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProduct from "../../state/product.state";
import { Product } from '../../product';
import { CreateProduct, UpdateProduct } from './../../state/product.actions';
import { getCurrentProduct, getShowProductCode, getProducts, getError } from '../../state/product.selector';
import { InitializeCurrentProduct, SetCurrentProduct, ToggleProductCode, Load, DeleteProduct } from '../../state/product.actions';

@Component({
    templateUrl: './product-shell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new Load());
    this.products$ = this.store.select(getProducts);
    this.displayCode$ = this.store.select(getShowProductCode);
    this.errorMessage$ = this.store.select(getError);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
  }

  newProduct(): void {
    this.store.dispatch(new InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new SetCurrentProduct(product));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new ToggleProductCode(value));
  }

  deleteProduct(productId: number): void {
    this.store.dispatch(new DeleteProduct(productId));
  }

  createProduct(product: Product): void {
    this.store.dispatch(new CreateProduct(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new UpdateProduct(product));
  }
}
