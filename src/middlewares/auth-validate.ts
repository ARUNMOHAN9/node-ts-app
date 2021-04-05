import { RequestHandler } from 'express';

const authValidate: RequestHandler = async (req, res, next) => {
    if (!req.session?.isLoggedIn) {
        return res.redirect('/login');
    }

    next();
}

export default authValidate;