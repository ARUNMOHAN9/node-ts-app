import { Router } from 'express';
import { body } from 'express-validator';

import authValidate from '../../middlewares/auth-validate';
import AdminCtrl from './admin.controller';

const router = Router();

router.get('/add-product', authValidate, AdminCtrl.getAddProduct);

router.get('/products', authValidate, AdminCtrl.getProducts);

router.post('/add-product', authValidate, [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('price')
        .isNumeric(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
], AdminCtrl.postAddProduct);

router.get('/edit-product/:productId', authValidate, AdminCtrl.getEditProduct);

router.post('/edit-product', authValidate, [
    body('title')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    body('price')
        .isNumeric(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
], AdminCtrl.postEditProduct);

router.post('/delete-product', authValidate, AdminCtrl.postDeleteProduct);

export default router;