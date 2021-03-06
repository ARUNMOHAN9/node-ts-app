import { Router } from 'express';
import ShopCtrl from './shop.controller';

const router = Router();

router.get('/', ShopCtrl.getProducts);

export default router;