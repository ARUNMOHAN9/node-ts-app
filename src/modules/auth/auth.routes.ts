import { Router } from 'express';
import AuthCtrl from './auth.controller';

const router = Router();

router.get('/login', AuthCtrl.getLogin);

router.post('/login', AuthCtrl.postLogin);

router.get('/signup', AuthCtrl.getSignup);

router.post('/signup', AuthCtrl.postSignup);

router.post('/logout', AuthCtrl.postLogout);

router.get('/reset', AuthCtrl.getReset);

router.post('/reset', AuthCtrl.postReset);

router.get('/reset/:token', AuthCtrl.getNewPassword);

router.post('/new-password', AuthCtrl.postNewPassword);

export default router;