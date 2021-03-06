
import { IProduct } from '../interfaces/product.interface';

class Product {
    private static products: IProduct[] = [];

    title = '';

    constructor(product: IProduct) {
        this.title = product.title;
    }

    save() {
        Product.products.push(this);
    }

    static fetchAll() {
        return Product.products;
    }
}

export default Product;