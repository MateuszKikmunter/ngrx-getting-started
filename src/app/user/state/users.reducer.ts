export function reducer(state, action): any {

    switch (action.type) {
        case "MASK_USERNAME":
            return {
                ...state,
                maskUserName: action.payload
            };

        default: return state;
    }
};