import { Action } from '@ngrx/store';

export enum UserActionsTypes {
    ClearCurrentUser = "[User] Clear Current User",
    MaskUserName = "[User] Mask User Name"
}

export class ClearCurrentUser implements Action {
    readonly type = UserActionsTypes.ClearCurrentUser;
}

export class MaskUserName implements Action {
    readonly type = UserActionsTypes.MaskUserName;

    constructor(public payload: boolean) {}
}

export type UserActions = ClearCurrentUser | MaskUserName;