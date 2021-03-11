import { RequestHandler } from 'express';
import Product from '../../utilities/models/product.model';

const getProducts: RequestHandler = async (req, res, next) => {

    try {
        const products = await Product.fetchAll();

        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    } catch (error) {
        console.log(error);
    }

}

const getProduct: RequestHandler = async (req, res, next) => {

    try {
        const prodId = req.params.productId;

        const product = await Product.fetchById(prodId);

        if (!product) {
            return res.redirect('/');
        } else {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: 'product.title',
                path: '/products'
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const getIndex: RequestHandler = async (req, res, next) => {

    try {
        const products = await Product.fetchAll();

        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    } catch (error) {
        console.log(error)
    }
};

const getCart: RequestHandler = async (req, res, next) => {
    try {
        const products = await req.user.getCart();
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
        });
    } catch (error) {
        console.log(error)
    }
};

const postCart: RequestHandler = async (req, res, next) => {
    try {
        const prodId = req.body.productId;
        const product = await Product.fetchById(prodId);

        await req.user.addToCart(product);

        res.redirect('/cart');

    } catch (error) {
        console.log(error)
    } finally {
        res.redirect('/cart');
    }
};

const postCartDeleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const prodId = req.body.productId;

        await req.user.deleteItemFromCart(prodId);

        res.redirect('/cart');
    } catch (error) {
        console.log(error)
    }
};

const postOrder: RequestHandler = async (req, res, next) => {
    // try {
    //     const cart = await req.user.getCart();
    //     const products = await cart.getProducts();
    //     const order = await req.user.createOrder();

    //     await order.addProducts(products.map((product: any) => {
    //         product.orderItem = { quantity: product.cartItem.quantity };
    //         return product;
    //     }));

    //     await cart.setProducts([]);

    //     res.redirect('/orders');

    // } catch (error) {
    //     console.log(error)
    // }
};

const getOrders: RequestHandler = async (req, res, next) => {
    // try {
    //     const orders = await req.user.getOrders({ include: ['products'] });
    //     res.render('shop/orders', {
    //         path: '/orders',
    //         pageTitle: 'Your Orders',
    //         orders: orders
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
    // res.render('shop/orders', {
    //     path: '/orders',
    //     pageTitle: 'Your Orders'
    // });
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
    getCheckout: getCheckout,
    postOrder: postOrder
}

export default ShopCtrl;