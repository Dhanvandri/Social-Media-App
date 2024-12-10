const express = require('express');
const multer = require('multer');
const { getPosts, createPost } = require('../controllers/postController'); // Correct import
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded files in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });

// Routes
router.get('/', getPosts); // Fetch posts
router.post('/', authenticate, upload.single('file'), createPost); // Create a post (protected)
router.post('/:id/like', authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.user.id)) {
            post.likes.push(req.user.id);
        } else {
            post.likes = post.likes.filter((id) => id !== req.user.id);
        }
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error liking post' });
    }
});

router.post('/:id/comment', authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push(req.body.comment);
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment' });
    }
});

module.exports = router;
