import { RequestHandler } from 'express';
import Product from '../../utilities/models/product.model';

const getAddProduct: RequestHandler = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}

const postAddProduct: RequestHandler = (req, res, next) => {

    const product = new Product({ title: req.body.title });
    product.save();

    res.redirect('/');
}

const AdminCtrl = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct
}

export default AdminCtrl;