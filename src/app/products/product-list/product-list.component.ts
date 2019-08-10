import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProduct, getProducts, getError } from './../state/product.selector';
import { ToggleProductCode, SetCurrentProduct, InitializeCurrentProduct, Load } from './../state/product.actions';
import { Product } from '../product';
import * as fromProduct from "../state/product.state";
import { getShowProductCode } from '../state/product.selector';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';

  displayCode: boolean;

  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  private _componentActive: boolean = true;

  constructor(private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.pipe(
      select(getCurrentProduct),
      takeWhile(() => this._componentActive))
    .subscribe(currentProduct => this.selectedProduct = currentProduct);

    this.store.pipe(
      select(getShowProductCode),
      takeWhile(() => this._componentActive))
    .subscribe(showProductCode => this.displayCode =  showProductCode);

    this.store.dispatch(new Load());
    this.products$ = this.store.pipe(select(getProducts));
    this.errorMessage$ = this.store.pipe(select(getError));
  }

  ngOnDestroy(): void {
    this._componentActive = false;
  }

  newProduct(): void {
    this.store.dispatch(new InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new SetCurrentProduct(product));
  }

  checkChanged(value: boolean) {
    this.store.dispatch(new ToggleProductCode(value));
  }

}