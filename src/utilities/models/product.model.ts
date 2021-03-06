
import path from 'path';
import fs from 'fs';

import rootDir from '../helpers/path';
import { IProduct } from '../interfaces/product.interface';

const productsPath = path.join(rootDir, 'src', 'data', 'products.json');

const readProdJson = new Promise<Product[]>((resolve, reject) => {
    fs.readFile(productsPath, (err, fileContent) => {
        let products = [];
        if (!err) {
            products = JSON.parse(fileContent.toString());
            resolve(products);
        }
        resolve([]);
    });
});

class Product {

    title = '';
    imageUrl = '';
    description = '';
    price = 0;
    id = Math.random().toString();

    constructor(product: IProduct) {
        this.title = product.title;
        this.imageUrl = product.imageUrl;
        this.description = product.description;
        this.price = product.price;
    }

    async save() {
        const products = await readProdJson;

        products.push(this);
        fs.writeFile(productsPath, JSON.stringify(products), (err) => {
            console.log(err);
        });

    }

    static fetchAll(): Promise<Product[]> {
        return readProdJson;
    }

    static async findById(id: string) {
        const products = await readProdJson;

        return products.find(product => product.id === id) || null;
    }
}

export default Product;