
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

    constructor(product: IProduct) {
        this.title = product.title;
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
}

export default Product;