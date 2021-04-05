import express from 'express';
import path from 'path';

import mongoose from 'mongoose';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
import csurf from 'csurf';
import flash from 'connect-flash';

import adminRouter from './src/modules/admin/admin.routes';
import shopRouter from './src/modules/shop/shop.routes';
import authRouter from './src/modules/auth/auth.routes';
import HttpStatus from './src/utilities/enums/http-status.enum';
import rootDir from './src/utilities/helpers/path';
import User from './src/utilities/models/user.model';

const app = express();

const MongoDbSore = ConnectMongoDBSession(session);
const store = new MongoDbSore({
    uri: "mongodb+srv://root:admin%40123@cluster0.kajhf.mongodb.net/shop",
    collection: 'sessions'
});

const csrfProtection = csurf();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    const authstate = (req.session as any).isLoggedIn;
    req.session!.isLoggedIn = authstate === true;
    next();
});

app.use((req, res, next) => {
    if (!req.session?.user?._id) {
        next();
        return;
    }
    User.findById(req.session!.user._id)
        .then(user => {
            req.user = user!;
        })
        .catch(err => console.log(err))
        .finally(() => next());
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session?.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();

    next();
});

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(authRouter);

app.use("*", (req, res) => {
    res.status(HttpStatus.NOT_FOUND).render('404', { pageTitle: 'Page Not Found', path: '' });
});

mongoose.connect("mongodb+srv://root:admin%40123@cluster0.kajhf.mongodb.net/shop?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => {
        console.log(`⚡️[server]: Server is running at https://localhost:3000`);
        app.listen(3000);
    })
    .catch(err => console.log(err));