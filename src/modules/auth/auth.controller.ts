import { RequestHandler } from 'express';

const getLogin: RequestHandler = async (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login'
    });
}

const AuthCtrl = {
    getLogin: getLogin
}

export default AuthCtrl;