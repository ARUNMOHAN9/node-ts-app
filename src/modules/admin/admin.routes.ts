import { Router } from 'express';
import AdminCtrl from './admin.controller';

const router = Router();

router.get('/add-product', AdminCtrl.getAddProduct);

router.get('/products', AdminCtrl.getProducts);

router.post('/add-product', AdminCtrl.postAddProduct);

export default router;