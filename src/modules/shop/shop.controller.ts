import { RequestHandler } from 'express';
import Order from '../../utilities/models/order.model';
import Product from '../../utilities/models/product.model';

const getProducts: RequestHandler = async (req, res, next) => {

    try {
        const products = await Product.find();

        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            isAuthenticated: req.isLoggedIn
        });
    } catch (error) {
        console.log(error);
    }

}

const getProduct: RequestHandler = async (req, res, next) => {

    try {
        const prodId = req.params.productId;

        const product = await Product.findById(prodId);

        if (!product) {
            return res.redirect('/');
        } else {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: 'product.title',
                path: '/products',
                isAuthenticated: req.isLoggedIn
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const getIndex: RequestHandler = async (req, res, next) => {

    try {
        const products = await Product.find();

        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            isAuthenticated: req.isLoggedIn
        });
    } catch (error) {
        console.log(error)
    }
};

const getCart: RequestHandler = async (req, res, next) => {
    try {
        const products = (await req.user.populate('cart.items.productId').execPopulate()).cart.items;
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            isAuthenticated: req.isLoggedIn
        });
    } catch (error) {
        console.log(error)
    }
};

const postCart: RequestHandler = async (req, res, next) => {
    try {
        const prodId = req.body.productId;
        const product = await Product.findById(prodId);

        if (product) {
            await req.user.addToCart(product);
        }

    } catch (error) {
        console.log(error)
    } finally {
        res.redirect('/cart');
    }
};

const postCartDeleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const prodId = req.body.productId;

        await req.user.removeFromCart(prodId);

        res.redirect('/cart');
    } catch (error) {
        console.log(error)
    }
};

const postOrder: RequestHandler = async (req, res, next) => {
    try {
        const cart = (await req.user.populate('cart.items.productId').execPopulate()).cart;
        const products = cart.items.map((item: any) => {
            return {
                quantity: item.quantity,
                product: { ...item.productId._doc }
            }
        });

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });

        await order.save();

        await req.user.clearCart();

        res.redirect('/orders');

    } catch (error) {
        console.log(error)
    }
};

const getOrders: RequestHandler = async (req, res, next) => {
    try {
        const orders = await Order.find({ "user.userId": req.user._id });
        res.render('shop/orders', {
            path: '/orders',
            pageTitle: 'Your Orders',
            orders: orders,
            isAuthenticated: req.isLoggedIn
        });
    } catch (error) {
        console.log(error);
    }
};

const getCheckout: RequestHandler = async (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated: req.isLoggedIn
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
    getCheckout: getCheckout,
    postOrder: postOrder
}

export default ShopCtrl;