import { Router } from 'express';
import AuthCtrl from './auth.controller';

const router = Router();

router.get('/login', AuthCtrl.getLogin);

export default router;