import express from 'express';
import upload from '../config/multer.js';
import * as blogController from '../controllers/blogController.js';

const router = express.Router();

router.get('/api/list', blogController.list);
router.post('/api', upload.single('image'), blogController.create);
router.get('/api/:id', blogController.get);
router.put('/api/:id', upload.single('image'), blogController.update);
router.delete('/api/:id', blogController.remove);

export default router;
