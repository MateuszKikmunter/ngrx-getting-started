import { getCurrentProduct } from './../state/product.selector';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { ToggleProductCode, SetCurrentProduct, InitializeCurrentProduct } from './../state/product.actions';
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
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    //TODO unsubscribe
    this.store.pipe(select(getCurrentProduct)).subscribe(currentProduct => this.selectedProduct = currentProduct);

    //TODO unsubscribe
    this.store.pipe(select(getShowProductCode)).subscribe(showProductCode => this.displayCode =  showProductCode);

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );
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