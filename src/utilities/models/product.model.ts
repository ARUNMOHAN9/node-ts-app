import { Db, ObjectId } from 'mongodb';
import { getDb } from '../helpers/database';
import { IProduct } from '../interfaces/product.interface';

class Product {
    title: string;
    price: number;
    description: string;
    imageUrl: string;
    _id?: string | null;
    userId?: string | null;
    constructor(product: IProduct, userId?: string) {
        this.title = product.title;
        this.price = product.price;
        this.description = product.description;
        this.imageUrl = product.imageUrl;
        this._id = product._id;
        this.userId = userId;
    }

    save() {
        if (this._id) {
            const { _id, ...data } = this;
            return getDb().collection('products').updateOne({ _id: new ObjectId(this._id) }, { $set: data })
        } else {
            return getDb().collection('products').insertOne(this);
        }
    }

    static delete(id: string) {
        return getDb().collection('products').deleteOne({ _id: new ObjectId(id) });
    }

    static fetchAll() {
        return getDb().collection('products').find().toArray();
    }

    static fetchById(id: string) {
        return getDb().collection('products').findOne({ _id: new ObjectId(id) });
    }
}

export default Product;