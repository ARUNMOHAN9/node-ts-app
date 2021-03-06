import { Router } from 'express';
import path from 'path';
import rootDir from '../../utilities/helpers/path';
import { products } from '../admin/admin.routes';

const router = Router();

router.get('/', (req, res, next) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

export default router;