import { Router } from 'express';
import authValidate from '../../middlewares/auth-validate';
import ShopCtrl from './shop.controller';

const router = Router();

router.get('/', ShopCtrl.getIndex);

router.get('/products', ShopCtrl.getProducts);

router.get('/products/:productId', ShopCtrl.getProduct);

router.get('/cart', authValidate, ShopCtrl.getCart);

router.post('/cart', authValidate, ShopCtrl.postCart);

router.get('/orders', authValidate, ShopCtrl.getOrders);

router.post('/create-order', authValidate, ShopCtrl.postOrder);

// router.get('/checkout',authValidate, ShopCtrl.getCheckout);

router.post('/cart-delete-item', authValidate, ShopCtrl.postCartDeleteProduct);

export default router;