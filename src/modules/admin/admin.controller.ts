import { RequestHandler } from 'express';

export const products: any[] = [];

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
    products.push({ title: req.body.title });
    res.redirect('/');
}

const AdminCtrl = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct
}

export default AdminCtrl;