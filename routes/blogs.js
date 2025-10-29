// routes/blogs.js
import express from 'express';
import * as blogController from '../controllers/blogController.js'; // ✅ Fix import
import upload from '../config/multer.js'; // ✅ Make sure multer.js also uses "export default"

const router = express.Router();

// ✅ Define your routes
router.get('/api/list', blogController.list);
router.post('/api', upload.single('image'), blogController.create);
router.get('/api/:id', blogController.get);
router.put('/api/:id', upload.single('image'), blogController.update);
router.delete('/api/:id', blogController.remove);

export default router;
