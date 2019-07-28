import { UserState } from '../user/state/user.state';

export interface State {
     users: UserState; //not lazy loaded, can be imported here
}