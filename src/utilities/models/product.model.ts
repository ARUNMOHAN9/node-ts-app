
import path from 'path';
import fs from 'fs';

import rootDir from '../helpers/path';
import { IProduct } from '../interfaces/product.interface';
import Cart from './cart.model';

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
    id: string | null;

    constructor(product: IProduct) {
        this.id = product.id || null;
        this.title = product.title;
        this.imageUrl = product.imageUrl;
        this.description = product.description;
        this.price = product.price;
    }

    async save() {
        const products = await readProdJson;

        return new Promise((resolve, reject) => {

            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
                resolve(true);
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
                resolve(true);
            }
        });
    }

    static fetchAll(): Promise<Product[]> {
        return readProdJson;
    }

    static async findById(id: string) {
        const products = await readProdJson;

        return products.find(product => product.id === id) || null;
    }

    static async deleteById(id: string) {
        const products = await readProdJson;

        const updatedProducts = products.filter(product => product.id !== id);
        fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
            if (!err) {
                Cart.deleteProduct(id);
            } else {
                console.log(err);
            }
        });
    }
}

export default Product;