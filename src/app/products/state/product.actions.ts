import { Action } from '@ngrx/store';

import { Product } from './../product';

export enum ProductActionTypes {
    ToggleProductCode = "[Product] Toggle Product Code",
    SetCurrentProduct = "[Product] Set Current Product",
    ClearCurrentProduct = "[Product] Clear Current Product",
    InitializeCurrentProduct = "[Product] Initialize Current Product",
    Load = "[Product] Load Products",
    LoadSuccess = "[Product] Load Products Successful",
    LoadFailure = "[Product] Load Products Failure",
    UpdateProduct = "[Product] Update Product",
    UpdateProductSuccess = "[Product] Update Product Success",
    UpdateProductFailure = "[Product] Update Product Failure"
}

export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;

    constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;

    constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class Load implements Action {
    readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;

    constructor(public payload: Product[]) {}
}

export class LoadFailure implements Action {
    readonly type = ProductActionTypes.LoadFailure;

    constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
    readonly type = ProductActionTypes.UpdateProduct;
    
    constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
    readonly type = ProductActionTypes.UpdateProductSuccess;
    
    constructor(public payload: Product) {}
}

export class UpdateProductFailure implements Action {
    readonly type = ProductActionTypes.UpdateProductFailure;
    
    constructor(public payload: string) {}
}

export type ProductActions = ToggleProductCode 
    | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct
    | Load
    | LoadSuccess
    | LoadFailure
    | UpdateProduct
    | UpdateProductSuccess
    | UpdateProductFailure;