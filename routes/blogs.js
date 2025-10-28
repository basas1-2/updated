const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../config/multer'); // ✅ add this line

// Routes
router.get('/api/list', blogController.list);
router.post('/api', upload.single('image'), blogController.create); // ✅ changed here
router.get('/api/:id', blogController.get);
router.put('/api/:id', upload.single('image'), blogController.update); // ✅ changed here
router.delete('/api/:id', blogController.remove);

module.exports = router;
