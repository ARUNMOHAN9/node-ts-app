import { Router } from 'express';
import { body, check } from 'express-validator';
import User from '../../utilities/models/user.model';
import AuthCtrl from './auth.controller';

const router = Router();

router.get('/login', AuthCtrl.getLogin);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail()
], AuthCtrl.postLogin);

router.get('/signup', AuthCtrl.getSignup);

router.post('/signup', [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(async (value, { req }) => {
            const userDoc = await User.findOne({ email: value });
            if (userDoc) {
                return Promise.reject('Email already exists, pick a different one')
            }
        }),
    body('password', 'Password must contain only numbers and text and atleast 5 characters')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(),
    body('confirmPassword').custom((value, { req }) => {
        if (value.trim() !== req.body.password) {
            throw new Error('Passwords have to match!');
        }
        return true;
    }).trim()
], AuthCtrl.postSignup);

router.post('/logout', AuthCtrl.postLogout);

router.get('/reset', AuthCtrl.getReset);

router.post('/reset', AuthCtrl.postReset);

router.get('/reset/:token', AuthCtrl.getNewPassword);

router.post('/new-password', AuthCtrl.postNewPassword);

export default router;