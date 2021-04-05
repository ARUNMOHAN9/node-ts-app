import { model, Schema, Document, Model } from 'mongoose';
import { IProduct } from './product.model';

export interface IUser extends Document {
    password: string;
    email: string;
    cart: any;
    addToCart: (product: IProduct) => Promise<IUser>;
    removeFromCart: (productId: number) => Promise<IUser>;
    clearCart: () => Promise<IUser>;
}

const UserSchema: Schema<IUser> = new Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }]
    }
});

UserSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart?.items.findIndex((prod: any) => prod.productId.toString() === product._id.toString());
    let newQty = 1;
    const updatedCartItems = this.cart?.items.map((elem: any) => {
        return {
            productId: elem.productId,
            quantity: elem.quantity!
        }
    }) || [];

    if (cartProductIndex !== -1 && this.cart?.items[cartProductIndex!]) {
        newQty = this.cart?.items[cartProductIndex!].quantity + 1;

        updatedCartItems![cartProductIndex!].quantity = newQty;
    } else {
        updatedCartItems?.push({ productId: product._id!, quantity: newQty });
    }

    const updatedCart = {
        items: updatedCartItems
    }

    this.cart = updatedCart;

    return this.save();
}

UserSchema.methods.removeFromCart = function (productId: number) {
    const updatedCartItems = this.cart.items.filter((item: any) => {
        return item.productId.toString() !== productId.toString()
    });

    this.cart.items = updatedCartItems;
    return this.save();
}

UserSchema.methods.clearCart = function () {
    this.cart = {
        items: []
    };
    return this.save();
}

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;