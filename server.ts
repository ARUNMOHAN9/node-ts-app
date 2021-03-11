import express from 'express';
import path from 'path';

import adminRouter from './src/modules/admin/admin.routes';
import shopRouter from './src/modules/shop/shop.routes';
import HttpStatus from './src/utilities/enums/http-status.enum';
import client from './src/utilities/helpers/database';
import rootDir from './src/utilities/helpers/path';
import User from './src/utilities/models/user.model';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    User.findById('6049ffc189dd39a8f0a5cf57')
        .then(user => {
            req.user = new User(user);
        })
        .catch(err => console.log(err))
        .finally(() => next());
});

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use("*", (req, res) => {
    res.status(HttpStatus.NOT_FOUND).render('404', { pageTitle: 'Page Not Found', path: '' });
});

client()
    .then((success) => {
        if (success) {
            console.log(`⚡️[server]: Server is running at https://localhost:4000`);
            app.listen(4000);
        }
    });

// app.listen(4000);