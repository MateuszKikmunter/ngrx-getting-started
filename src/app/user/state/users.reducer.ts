import { UserState } from './user.state';
import { UserActions, UserActionsTypes } from './user.actions';

const initialUserState: UserState = {
    maskUserName: true,
    currentUser: null
};

export function reducer(state = initialUserState, action: UserActions): UserState {

    switch (action.type) {
        case UserActionsTypes.MaskUserName:
            return {
                ...state,
                maskUserName: action.payload
            };

        case UserActionsTypes.ClearCurrentUser:
            return {
                ...state,
                currentUser: null
            };

        default: return state;
    }
};