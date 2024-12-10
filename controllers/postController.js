const Post = require('../models/Post');

// Fetch all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username email');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};

// Create a new post
const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const file = req.file;

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        if (!content && !file) {
            return res.status(400).json({ message: 'Content or file is required.' });
        }

        const newPost = new Post({
            user: req.user.id,
            content,
            fileUrl: file ? `/uploads/${file.filename}` : null,
            fileType: file ? file.mimetype : null,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post' });
    }
};

module.exports = { getPosts, createPost };
