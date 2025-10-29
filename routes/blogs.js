const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../config/multer'); // ✅ Make sure this points to your multer file

// ✅ Get all blogs
router.get('/api/list', blogController.list);

// ✅ Create new blog with image upload
router.post('/api', upload.single('image'), blogController.create);

// ✅ Get one blog by ID
router.get('/api/:id', blogController.getById);

// ✅ Update blog with optional image upload
router.put('/api/:id', upload.single('image'), blogController.update);

// ✅ Delete a blog
router.delete('/api/:id', blogController.remove);

module.exports = router;
