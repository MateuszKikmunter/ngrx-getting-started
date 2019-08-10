import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductActionTypes, Load, LoadSuccess, LoadFailure } from './product.actions';
import { ProductService } from './../product.service';
import { Product } from '../product';

@Injectable()
export class ProductEffect {

    constructor(private actions$: Actions, private productServce: ProductService) { }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(ProductActionTypes.Load),
        mergeMap((action: Load) => this.productServce.getProducts().pipe(
            map((products: Product[]) => new LoadSuccess(products)),
            catchError(err => of(new LoadFailure(err.message)))
        ))
    )
}