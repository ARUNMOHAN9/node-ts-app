import express from 'express';
import path from 'path';

import adminRouter from './src/modules/admin/admin.routes';
import shopRouter from './src/modules/shop/shop.routes';
import HttpStatus from './src/utilities/enums/http-status.enum';
import rootDir from './src/utilities/helpers/path';

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use("*", (req, res, next) => {
    res.status(HttpStatus.NOT_FOUND).sendFile(path.join(rootDir, 'src', 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});