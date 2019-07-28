import { UserState } from './user.state';

export function reducer(state: UserState, action): UserState {

    switch (action.type) {
        case "MASK_USERNAME":
            return {
                ...state,
                maskUserName: action.payload
            };

        default: return state;
    }
};