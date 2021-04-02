import { model, Schema, Model, Document } from 'mongoose';

export interface IOrder extends Document {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
}

const OrderSchema: Schema = new Schema({
    products: [
        {
            product: {
                type: Object, required: true
            },
            quantity: {
                type: Number, required: true
            },
        }
    ],
    user: {
        name: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;