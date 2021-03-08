import express from 'express';
import path from 'path';

// import adminRouter from './src/modules/admin/admin.routes';
// import shopRouter from './src/modules/shop/shop.routes';
import HttpStatus from './src/utilities/enums/http-status.enum';
import client from './src/utilities/helpers/database';
import rootDir from './src/utilities/helpers/path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

// app.use('/admin', adminRouter);
// app.use(shopRouter);

app.use("*", (req, res) => {
    res.status(HttpStatus.NOT_FOUND).render('404', { pageTitle: 'Page Not Found', path: '' });
});

client
    .then(client => {
        console.log(client);
        app.listen(8000);
    })
    .catch(err => console.log(err))