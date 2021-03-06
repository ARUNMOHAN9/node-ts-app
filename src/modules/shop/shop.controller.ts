import { RequestHandler } from 'express';
import Product from '../../utilities/models/product.model';

const getProducts: RequestHandler = async (req, res, next) => {

    const products = await Product.fetchAll();

    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
}

const ShopCtrl = {
    getProducts: getProducts
}

export default ShopCtrl;