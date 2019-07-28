
import * as fromRoot from "../../state/app.state";

export interface UserState extends fromRoot.State {
    maskUserName: boolean;
}