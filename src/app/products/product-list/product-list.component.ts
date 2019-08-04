import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ToggleProductCode } from './../state/product.actions';
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
  sub: Subscription;

  constructor(private store: Store<fromProduct.State>,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    this.store.pipe(select(getShowProductCode)).subscribe(showProductCode => this.displayCode =  showProductCode);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

  checkChanged(value: boolean) {
    this.store.dispatch(new ToggleProductCode(value));
  }

}