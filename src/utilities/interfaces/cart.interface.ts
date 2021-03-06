import { IProduct } from './product.interface';

export interface ICartItem extends IProduct {
    quantity: number;
}

export interface ICart {
    products: ICartItem[];
    totalPrice: number;
}
