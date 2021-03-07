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
    const cart = await Cart.getCart();

    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cart.products
    });
};

const postCart: RequestHandler = async (req, res, next) => {
    const prodId = req.body.productId;

    const product = await Product.findById(prodId);
    Cart.addProduct(prodId, product!);
    res.redirect('/cart');
};

const postCartDeleteProduct: RequestHandler = async (req, res, next) => {
    const prodId = req.body.productId;

    await Cart.deleteProduct(prodId);

    res.redirect('/cart');
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
    postCartDeleteProduct: postCartDeleteProduct,
    getCheckout: getCheckout
}

export default ShopCtrl;