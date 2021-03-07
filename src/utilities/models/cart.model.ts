import path from 'path';
import fs from 'fs';

import rootDir from '../helpers/path';
import { ICart, ICartItem } from '../interfaces/cart.interface';
import { IProduct } from '../interfaces/product.interface';


const cartPath = path.join(rootDir, 'src', 'data', 'cart.json');

const readProdJson = new Promise<ICart>((resolve, reject) => {
    fs.readFile(cartPath, (err, fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (!err) {
            cart = JSON.parse(fileContent.toString());
            resolve(cart);
        }
        resolve(cart);
    });
});


class Cart {

    static async addProduct(id: string, product: IProduct) {
        const cart = await readProdJson;

        const existingProductIndex = cart.products.findIndex(product => product.id === id);
        const existingProduct = cart.products[existingProductIndex];

        let updatedProduct: ICartItem;

        if (existingProduct) {
            updatedProduct = { ...existingProduct, quantity: ++existingProduct.quantity };
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updatedProduct;
        } else {
            updatedProduct = { ...product, id: id, quantity: 1 };
            cart.products = [...cart.products, updatedProduct];
        }

        cart.totalPrice += product.price;

        fs.writeFile(cartPath, JSON.stringify(cart), err => {
            console.log(err);
        });
    }

    static async deleteProduct(id: string) {
        const cart = await readProdJson;

        const existingProductIndex = cart.products.findIndex(product => product.id === id);

        if (existingProductIndex !== -1) {
            const prodQty = cart.products[existingProductIndex].quantity;

            const updatedCart: ICart = {
                products: cart.products.filter(product => product.id !== id),
                totalPrice: cart.totalPrice - (prodQty * cart.products[existingProductIndex].price)
            }

            fs.writeFile(cartPath, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        }
    }

    static async getCart() {
        return readProdJson;
    }

}

export default Cart;