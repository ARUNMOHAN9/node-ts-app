import { RequestHandler } from 'express';
import bcyrpt from 'bcryptjs';
import crypto from 'crypto';

import User from '../../utilities/models/user.model';
import { sendMail } from '../../utilities/helpers/email-trigger';
import { resolve } from 'path';

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

        return sendMail({
            from: 'Excited User <me@samples.mailgun.org>',
            to: 'arwebdev233@gmail.com',
            subject: 'Registration successful',
            html: '<h1>You have successfully signed up!</h1>'
        });
    } catch (error) {
        console.log(error);
    }
}

const postLogout: RequestHandler = async (req, res, next) => {
    req.session?.destroy(() => {
        res.redirect('/');
    });
}

const getReset: RequestHandler = async (req, res, next) => {
    const errMsg = req.flash('error')?.join('/n');

    res.render('auth/reset', {
        pageTitle: 'Reset',
        path: '/reset',
        errorMessage: errMsg
    })
}

const postReset: RequestHandler = async (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }

        const token = buffer.toString('hex');

        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash('error', 'No account with the given mailId');
                    res.redirect('/reset');
                } else {
                    user.resetToken = token;
                    user.resetTokenExpiration = Date.now() + 3600000;
                    user.save();
                    resolve();
                }
            })
            .then(() => {
                res.redirect('/');
                sendMail({
                    from: 'Excited User <me@samples.mailgun.org>',
                    to: 'arwebdev233@gmail.com',
                    subject: 'Reset password',
                    html: `
                    <p>You requested a password reset</p>
                    <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
                    `
                });
            })
            .catch(err => console.log(err));
    });
}

const getNewPassword: RequestHandler = async (req, res, next) => {
    try {
        const errMsg = req.flash('error')?.join('/n');
        const token = req.params.token;
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

        if (!user) {
            return res.redirect('/reset');
        } else {
            res.render('auth/new-password', {
                pageTitle: 'New Password',
                path: '/new-password',
                errorMessage: errMsg,
                userId: user._id.toString(),
                passwordToken: token
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const postNewPassword: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body;

        const { newPassword, userId, passwordToken } = body;

        const user = await User.findOne({ resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() }, _id: userId });

        if (user) {
            const encryptedPass = await bcyrpt.hash(newPassword, 12);
            user.password = encryptedPass;
            user.resetToken = undefined;
            user.resetTokenExpiration = undefined;
            await user.save();
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
    }
}

const AuthCtrl = {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    postLogout,
    getReset,
    postReset,
    getNewPassword,
    postNewPassword
}

export default AuthCtrl;