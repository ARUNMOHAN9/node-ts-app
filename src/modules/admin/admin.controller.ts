import { RequestHandler } from 'express';
import Product from '../../utilities/models/product.model';

const getAddProduct: RequestHandler = async (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}

const postAddProduct: RequestHandler = async (req, res, next) => {

    const product = new Product({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: +req.body.price,
        description: req.body.description,
    });
    product.save();

    res.redirect('/');
}

const getProducts: RequestHandler = async (req, res, next) => {

    const products = await Product.fetchAll();

    res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
    });
};

const AdminCtrl = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts
}

export default AdminCtrl;