
import { FieldPacket, RowDataPacket } from 'mysql2';
import db from '../helpers/database';
import { IProduct } from '../interfaces/product.interface';

class Product {

    title = '';
    imageUrl = '';
    description = '';
    price = 0;
    id: string | null;

    constructor(product: IProduct) {
        this.id = product.id || null;
        this.title = product.title;
        this.imageUrl = product.imageUrl;
        this.description = product.description;
        this.price = product.price;
    }

    async save() {
        return db.execute(`
            INSERT INTO products
            (title, price, imageUrl, description)
            VALUES (?, ?, ?, ?)
        `, [this.title, this.price, this.imageUrl, this.description]);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static async findById(id: number): Promise<[RowDataPacket[], FieldPacket[]]> {
        return db.execute('SELECT * FROM products where id = ?', [id]);
    }

    static async deleteById(id: string) {

    }
}

export default Product;