import { RequestHandler } from 'express';

const getLogin: RequestHandler = async (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.isLoggedIn
    });
}

const postLogin: RequestHandler = async (req, res, next) => {
    (req.session as any).isLoggedIn = true;
    res.redirect('/');
}

const AuthCtrl = {
    getLogin: getLogin,
    postLogin: postLogin
}

export default AuthCtrl;