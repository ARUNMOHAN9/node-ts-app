import { ObjectId } from 'mongodb';
import { getDb } from '../helpers/database';
import { IProduct } from '../interfaces/product.interface';

class Product {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    constructor(product: IProduct) {
        this.title = product.title;
        this.price = product.price;
        this.description = product.description;
        this.imageUrl = product.imageUrl;
    }

    save() {
        const db = getDb();
        return db.collection('products').insertOne(this);
    }

    static fetchAll() {
        return getDb().collection('products').find().toArray();
    }

    static fetchById(id: string) {
        return getDb().collection('products').findOne({ _id: new ObjectId(id) });
    }
}

export default Product;