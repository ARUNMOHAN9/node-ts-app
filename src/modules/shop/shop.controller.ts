import { RequestHandler } from 'express';
import Cart from '../../utilities/models/cart.model';
import Product from '../../utilities/models/product.model';

const getProducts: RequestHandler = async (req, res, next) => {

    const products = await Product.fetchAll();

    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
    });
}

const getProduct: RequestHandler = async (req, res, next) => {

    const prodId = req.params.productId;

    const product = await Product.findById(prodId);

    res.render('shop/product-detail', {
        product: product,
        pageTitle: product?.title,
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

const postCart: RequestHandler = async (req, res, next) => {
    const prodId = req.body.productId;

    const product = await Product.findById(prodId);
    Cart.addProduct(prodId, product!);
    res.redirect('/cart');
    // res.render('shop/cart', {
    //     path: '/cart',
    //     pageTitle: 'Your Cart'
    // });
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
    getProduct: getProduct,
    getIndex: getIndex,
    getCart: getCart,
    postCart: postCart,
    getOrders: getOrders,
    getCheckout: getCheckout
}

export default ShopCtrl;