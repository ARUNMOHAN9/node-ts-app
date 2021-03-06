import { Router } from 'express';
import ShopCtrl from './shop.controller';

const router = Router();

router.get('/', ShopCtrl.getIndex);

router.get('/products', ShopCtrl.getProducts);

router.get('/products/:productId', ShopCtrl.getProduct);

router.get('/cart', ShopCtrl.getCart);

router.get('/orders', ShopCtrl.getOrders);

router.get('/checkout', ShopCtrl.getCheckout);

export default router;