import express from 'express';
import path from 'path';

import adminRouter from './src/modules/admin/admin.routes';
import shopRouter from './src/modules/shop/shop.routes';
import HttpStatus from './src/utilities/enums/http-status.enum';
import db from './src/utilities/helpers/database';
import rootDir from './src/utilities/helpers/path';
import Product from './src/utilities/models/product.model';
import User from './src/utilities/models/user.model';

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            (req as any).user = user;
            next();
        })
        .catch(err => console.log(err))
});

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use("*", (req, res, next) => {
    res.status(HttpStatus.NOT_FOUND).render('404', { pageTitle: 'Page Not Found', path: '' });
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

db.sync()
    .then(_ => {
        User.findByPk(1)
            .then(user => {
                if (!user) {
                    return User.create({ name: 'Max', email: 'test@test.com' });
                }
                return user;
            })
            .then(user => {
                console.log(user);
                app.listen(PORT, () => {
                    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
                });
            });
    })
    .catch(err => console.log(err))
