import { RequestHandler } from 'express';
import User from '../../utilities/models/user.model';

const getLogin: RequestHandler = async (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.isLoggedIn
    });
}

const postLogin: RequestHandler = async (req, res, next) => {
    const user = await User.findById('6066ba478d9a30494c154d3f');
    req.session!.isLoggedIn = true;
    req.session!.user = user;
    req.session!.save((err) => {
        res.redirect('/');
        console.log(err);
    });
}

const postLogout: RequestHandler = async (req, res, next) => {
    req.session?.destroy(() => {
        res.redirect('/');
    });
}

const AuthCtrl = {
    getLogin,
    postLogin,
    postLogout
}

export default AuthCtrl;