import { RequestHandler } from 'express';
import bcyrpt from 'bcryptjs';
import User from '../../utilities/models/user.model';

const getLogin: RequestHandler = async (req, res, next) => {
    const errMsg = req.flash('error')?.join('/n');
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: errMsg
    });
}

const postLogin: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const { email, password } = body;

        const user = await User.findOne({ email: email });

        if (user) {
            const isPasswordSame = await bcyrpt.compare(password, user.password);

            if (isPasswordSame) {
                req.session!.isLoggedIn = true;
                req.session!.user = user;
                return req.session!.save((err) => {
                    res.redirect('/');
                    console.log(err);
                });
            } else {
                req.flash('error', 'Invalid credentials');
                return res.redirect('/login');
            }
        } else {
            req.flash('error', 'Invalid credentials');
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
        return res.redirect('/login');
    }
}

const getSignup: RequestHandler = async (req, res, next) => {
    const errMsg = req.flash('error')?.join('/n');
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        path: '/signup',
        errorMessage: errMsg
    });
}

const postSignup: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const { email, password, confirmPassword } = body;

        const userDoc = await User.findOne({ email: email });
        if (userDoc || (password !== confirmPassword)) {
            req.flash('error', 'Invalid user details');
            return res.redirect('/signup');
        }

        const encryptedPass = await bcyrpt.hash(password, 12);

        const user = new User({
            email: email,
            password: encryptedPass,
            cart: { items: [] }
        })

        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}

const postLogout: RequestHandler = async (req, res, next) => {
    req.session?.destroy(() => {
        res.redirect('/');
    });
}

const AuthCtrl = {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    postLogout
}

export default AuthCtrl;