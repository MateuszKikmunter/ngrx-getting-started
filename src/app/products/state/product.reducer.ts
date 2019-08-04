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
                currentProduct: null
            };

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProduct: action.payload
            };

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProduct: state.currentProduct
            };

        default:
            return state;
    }
}