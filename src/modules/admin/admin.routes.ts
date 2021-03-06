import { Router } from 'express';
import path from 'path';
import rootDir from '../../utilities/helpers/path';

const router = Router();

export const products: any[] = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
});

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

export default router;