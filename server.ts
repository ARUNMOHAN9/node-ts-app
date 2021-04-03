import express from 'express';
import path from 'path';

import mongoose from 'mongoose';

import adminRouter from './src/modules/admin/admin.routes';
import shopRouter from './src/modules/shop/shop.routes';
import authRouter from './src/modules/auth/auth.routes';
import HttpStatus from './src/utilities/enums/http-status.enum';
import rootDir from './src/utilities/helpers/path';
import User from './src/utilities/models/user.model';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    User.findById('6066ba478d9a30494c154d3f')
        .then(user => {
            if (user)
                req.user = user;
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