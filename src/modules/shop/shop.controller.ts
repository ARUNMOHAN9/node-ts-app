import { RequestHandler } from 'express';
import { products } from '../admin/admin.controller';

const getProducts: RequestHandler = (req, res, next) => {
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