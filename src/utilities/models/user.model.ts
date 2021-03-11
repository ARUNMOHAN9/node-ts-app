import { ObjectId } from 'mongodb';
import { getDb } from '../helpers/database';
import { ICart } from '../interfaces/cart.interface';
import { IProduct } from '../interfaces/product.interface';
import IUser from '../interfaces/user.interface';

class User {
    name: string;
    email: string;
    _id: string;
    cart?: any;
    constructor(user: IUser) {
        this.name = user.name;
        this.email = user.email;
        this._id = user._id;
        this.cart = user.cart;
    }

    save() {
        return getDb().collection('users').insertOne(this);
    }

    addToCart(product: any) {
        const cartProductIndex = this.cart?.products.findIndex((prod: any) => prod.productId.toString() === product._id.toString());
        let newQty = 1;
        const updatedCartItems = this.cart?.products.map((elem: any) => {
            return {
                productId: new ObjectId(elem._id!),
                quantity: elem.quantity!
            }
        }) || [];

        if (cartProductIndex !== -1 && this.cart?.products[cartProductIndex!]) {
            newQty = this.cart?.products[cartProductIndex!].quantity + 1;

            updatedCartItems![cartProductIndex!].quantity = newQty;
        } else {
            updatedCartItems?.push({ productId: new ObjectId(product._id!), quantity: newQty });
        }

        const updatedCart = {
            products: updatedCartItems
        }

        return getDb().collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }

    static findById(userId: string) {
        return getDb().collection('users').findOne({ _id: new ObjectId(userId) });
    }
}

export default User;