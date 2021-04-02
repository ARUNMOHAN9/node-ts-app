import { Router } from 'express';
import AdminCtrl from './admin.controller';

const router = Router();

router.get('/add-product', AdminCtrl.getAddProduct);

// router.get('/products', AdminCtrl.getProducts);

router.post('/add-product', AdminCtrl.postAddProduct);

// router.get('/edit-product/:productId', AdminCtrl.getEditProduct);

// router.post('/edit-product', AdminCtrl.postEditProduct);

// router.post('/delete-product', AdminCtrl.postDeleteProduct);

export default router;