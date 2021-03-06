import { RequestHandler } from 'express';
import Product from '../../utilities/models/product.model';

const getProducts: RequestHandler = (req, res, next) => {
    res.render('shop', {
        prods: Product.fetchAll(),
        pageTitle: 'Shop',
        path: '/',
        hasProducts: Product.fetchAll().length > 0,
        activeShop: true,
        productCSS: true
    });
}

const ShopCtrl = {
    getProducts: getProducts
}

export default ShopCtrl;