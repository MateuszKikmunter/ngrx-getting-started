import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { 
    ProductActionTypes, 
    Load, 
    LoadSuccess, 
    LoadFailure, 
    UpdateProduct, 
    UpdateProductSuccess, 
    UpdateProductFailure 
} from './product.actions';

import { ProductService } from '../product.service';
import { Product } from '../product';

@Injectable()
export class ProductEffect {

    constructor(private actions$: Actions, private productService: ProductService) { }

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(ProductActionTypes.Load),
        mergeMap((action: Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => new LoadSuccess(products)),
            catchError(err => of(new LoadFailure(err.message)))
        ))
    )

    @Effect()
    upateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(ProductActionTypes.UpdateProduct),
        map((action: UpdateProduct) => action.payload),
        mergeMap((product: Product) => 
            this.productService.updateProduct(product).pipe(
                map(updatedProduct => (new UpdateProductSuccess(updatedProduct))),
                catchError(err => of(new UpdateProductFailure(err.message)))
        ))
    )
}