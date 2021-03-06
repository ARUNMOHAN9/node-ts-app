import { Router } from 'express';
import path from 'path';
import rootDir from '../../utilities/helpers/path';

const router = Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'src', 'views', 'shop.html'));
});

export default router;