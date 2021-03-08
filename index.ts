import express from 'express';
import path from 'path';

import adminRouter from './src/modules/admin/admin.routes';
import shopRouter from './src/modules/shop/shop.routes';
import HttpStatus from './src/utilities/enums/http-status.enum';
import db from './src/utilities/helpers/database';
import rootDir from './src/utilities/helpers/path';
import CartItem from './src/utilities/models/cart-item.model';
import Cart from './src/utilities/models/cart.model';
import OrderItem from './src/utilities/models/order-item';
import Order from './src/utilities/models/order.model';
import Product from './src/utilities/models/product.model';
import User from './src/utilities/models/user.model';

const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user!;
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
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

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
                // console.log(user);
                user.createCart().then(_ => {
                    app.listen(PORT, () => {
                        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
                    });
                });
            });
    })
    .catch(err => console.log(err))
