const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname,'..','uploads');
if(!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({ destination:(req,file,cb)=>cb(null,uploadDir), filename:(req,file,cb)=>cb(null, Date.now()+'-'+Math.round(Math.random()*1E9)+path.extname(file.originalname))});
const imageFileFilter = (req,file,cb)=>{ if(!file.mimetype.startsWith('image/')) return cb(new Error('Only image files are allowed'), false); cb(null, true); };
const upload = multer({ storage, limits:{ fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/whoami', authController.whoami);
router.post('/avatar', upload.single('avatar'), authController.uploadAvatar);
router.get('/profile/:username', authController.getProfileByUsername);

module.exports = router;
