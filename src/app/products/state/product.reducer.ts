import { ProductState, initialProductState } from './product.state';

export function reducer(state = initialProductState, action): ProductState {

    switch (action.type) {
        case "TOGGLE_PRODUCT_CODE":
            return {
                ...state,
                showProductCode: action.payload
            };

        default:
            return state;
    }
}