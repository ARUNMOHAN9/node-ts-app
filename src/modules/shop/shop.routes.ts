import { Router } from 'express';
import ShopCtrl from './shop.controller';

const router = Router();

router.get('/', ShopCtrl.getIndex);

router.get('/products', ShopCtrl.getProducts);

router.get('/products/:productId', ShopCtrl.getProduct);

router.get('/cart', ShopCtrl.getCart);

router.post('/cart', ShopCtrl.postCart);

router.get('/orders', ShopCtrl.getOrders);

router.post('/create-order', ShopCtrl.postOrder);

// router.get('/checkout', ShopCtrl.getCheckout);

router.post('/cart-delete-item', ShopCtrl.postCartDeleteProduct);

export default router;