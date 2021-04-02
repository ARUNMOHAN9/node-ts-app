import express from 'express';
import path from 'path';

import mongoose from 'mongoose';

import adminRouter from './src/modules/admin/admin.routes';
import shopRouter from './src/modules/shop/shop.routes';
import HttpStatus from './src/utilities/enums/http-status.enum';
import rootDir from './src/utilities/helpers/path';
import User from './src/utilities/models/user.model';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

// app.use((req, res, next) => {
//     User.findById('6049ffc189dd39a8f0a5cf57')
//         .then(user => {
//             req.user = new User(user);
//         })
//         .catch(err => console.log(err))
//         .finally(() => next());
// });

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use("*", (req, res) => {
    res.status(HttpStatus.NOT_FOUND).render('404', { pageTitle: 'Page Not Found', path: '' });
});

mongoose.connect("mongodb+srv://root:admin%40123@cluster0.kajhf.mongodb.net/shop?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(_ => {
    console.log(`⚡️[server]: Server is running at https://localhost:3000`);
    app.listen(3000);
}).catch(err => console.log(err))