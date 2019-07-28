export function reducer(state, action): any {

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