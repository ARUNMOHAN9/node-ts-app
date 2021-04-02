import { model, Schema, Model, Document } from 'mongoose';

interface IProduct extends Document {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
}

const ProductSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
});

const Product = model<IProduct>('Product', ProductSchema);

export default Product;