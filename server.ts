import express from 'express';
import path from 'path';

import mongoose from 'mongoose';
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';

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

app.use((req, res, next) => {
    const authstate = (req.session as any).isLoggedIn;
    req.isLoggedIn = authstate === true;
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

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(authRouter);

app.use("*", (req, res) => {
    res.status(HttpStatus.NOT_FOUND).render('404', { pageTitle: 'Page Not Found', path: '' });
});

mongoose.connect("mongodb+srv://root:admin%40123@cluster0.kajhf.mongodb.net/shop?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(_ => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Max',
                email: 'max@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    }).then(_ => {
        console.log(`⚡️[server]: Server is running at https://localhost:3000`);
        app.listen(3000);
    });
}).catch(err => console.log(err))