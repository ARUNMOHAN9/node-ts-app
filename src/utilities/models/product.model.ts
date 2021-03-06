
import path from 'path';
import fs from 'fs';

import rootDir from '../helpers/path';
import { IProduct } from '../interfaces/product.interface';

class Product {

    title = '';

    constructor(product: IProduct) {
        this.title = product.title;
    }

    save() {

        const p = path.join(rootDir, 'src', 'data', 'products.json');

        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent.toString());
            }
            products.push(this);

            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(): Promise<Product[]> {
        const p = path.join(rootDir, 'src', 'data', 'products.json');

        const promise = new Promise<Product[]>((resolve, reject) => {
            fs.readFile(p, (err, fileContent) => {
                let products = [];
                if (!err) {
                    products = JSON.parse(fileContent.toString());
                    resolve(products);
                }
                resolve([]);
            });
        });

        return promise;
    }
}

export default Product;