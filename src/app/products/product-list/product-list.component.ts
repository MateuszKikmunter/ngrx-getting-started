import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProduct, getProducts, getError } from './../state/product.selector';
import { ToggleProductCode, SetCurrentProduct, InitializeCurrentProduct, Load } from './../state/product.actions';
import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromProduct from "../state/product.state";
import { getShowProductCode } from '../state/product.selector';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';

  displayCode: boolean;

  products: Product[];
  products$: Observable<Product[]>;

  errorMessage$: Observable<string>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentProduct)).subscribe(currentProduct => this.selectedProduct = currentProduct);
    this.store.pipe(select(getShowProductCode)).subscribe(showProductCode => this.displayCode =  showProductCode);

    this.store.dispatch(new Load());
    this.products$ = this.store.pipe(select(getProducts));
    this.errorMessage$ = this.store.pipe(select(getError));
  }

  ngOnDestroy(): void {
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