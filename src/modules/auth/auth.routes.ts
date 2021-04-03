import { Router } from 'express';
import AuthCtrl from './auth.controller';

const router = Router();

router.get('/login', AuthCtrl.getLogin);

router.post('/login', AuthCtrl.postLogin);

router.post('/logout', AuthCtrl.postLogout);

export default router;