import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
}

const UserSchema: Schema = new Schema({
    name: {
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

const User = model<IUser>('User', UserSchema);

export default User;