import { RequestHandler } from 'express';
import Product from '../../utilities/models/product.model';

const getProducts: RequestHandler = async (req, res, next) => {

    const products = await Product.fetchAll();

    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
    });
}

const getIndex: RequestHandler = async (req, res, next) => {

    const products = await Product.fetchAll();

    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
    });
};

const getCart: RequestHandler = async (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

const getOrders: RequestHandler = async (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

const getCheckout: RequestHandler = async (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

const ShopCtrl = {
    getProducts: getProducts,
    getIndex: getIndex,
    getCart: getCart,
    getOrders: getOrders,
    getCheckout: getCheckout
}

export default ShopCtrl;