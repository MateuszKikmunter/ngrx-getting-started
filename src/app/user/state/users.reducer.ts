import { UserState } from './user.state';

const initialUserState: UserState = {
    maskUserName: true,
    currentUser: null
};

export function reducer(state = initialUserState, action): UserState {

    switch (action.type) {
        case "MASK_USERNAME":
            return {
                ...state,
                maskUserName: action.payload
            };

        default: return state;
    }
};