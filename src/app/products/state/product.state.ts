import { Product } from './../product';
import * as fromRoot from "../../state/app.state";

export const initialProductState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ""
};

//it's a lazy loaded module, so we have to extend main state interface so lazy loading boundaries are not broken
export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

export interface State extends fromRoot.State {
    products: ProductState
}