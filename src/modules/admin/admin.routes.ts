import { Router } from 'express';
import path from 'path';
import rootDir from '../../utilities/helpers/path';

const router = Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'src', 'views', 'add-product.html'));
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

export default router;