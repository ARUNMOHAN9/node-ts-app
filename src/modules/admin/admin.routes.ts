import { Router } from 'express';
import authValidate from '../../middlewares/auth-validate';
import AdminCtrl from './admin.controller';

const router = Router();

router.get('/add-product', authValidate, AdminCtrl.getAddProduct);

router.get('/products', authValidate, AdminCtrl.getProducts);

router.post('/add-product', authValidate, AdminCtrl.postAddProduct);

router.get('/edit-product/:productId', authValidate, AdminCtrl.getEditProduct);

router.post('/edit-product', authValidate, AdminCtrl.postEditProduct);

router.post('/delete-product', authValidate, AdminCtrl.postDeleteProduct);

export default router;