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
                productId: elem.productId,
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

    async getCart() {
        const prodIds = this.cart?.products.map((elem: any) => elem.productId) || [];
        return getDb()
            .collection('products')
            .find({ _id: { $in: prodIds } })
            .toArray()
            .then((products: any) => {
                return products.map((p: any) => {
                    return {
                        ...p, quantity: this.cart.products?.find((i: any) => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    }
                })
            });
    }

    async addOrder() {
        const products = await this.getCart();

        const order = {
            products: products,
            user: {
                _id: new ObjectId(this._id),
                name: this.name,
                email: this.email
            }
        }
        return getDb().collection('orders').insertOne(order)
            .then(() => {
                this.cart = { products: [] };
                return getDb().collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { products: [] } } })
            });
    }

    getOrders() {
        return getDb().collection('orders').find({ 'user._id': new ObjectId(this._id) }).toArray()
    }

    deleteItemFromCart(id: string) {
        const updatedItems = this.cart.products.filter((elem: any) => elem.productId.toString() !== id.toString());
        return getDb().collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { products: updatedItems } } })
    }

    static findById(userId: string) {
        return getDb().collection('users').findOne({ _id: new ObjectId(userId) });
    }
}

export default User;