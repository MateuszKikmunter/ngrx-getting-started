import { ProductActions, ProductActionTypes } from './product.actions';
import { ProductState, initialProductState } from './product.state';

export function reducer(state = initialProductState, action: ProductActions): ProductState {

    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            };

        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            };

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId: action.payload.id
            };

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0
            };

        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                products: action.payload,
                error: ""
            };

        case ProductActionTypes.LoadFailure:
            return {
                ...state,
                products: [],
                error: action.payload
            };

        case ProductActionTypes.UpdateProduct:
            return {
                ...state,
                currentProductId: action.payload.id,
                error: ""
            };

        case ProductActionTypes.UpdateProductSuccess:
            const updatedProducts = state.products.map(item => action.payload.id === item.id ? action.payload : item);
            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.payload.id,
                error: ""
            };

        case ProductActionTypes.UpdateProductFailure:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}