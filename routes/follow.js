const express = require('express');
const { followUser, unfollowUser } = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:id/follow', authMiddleware, followUser);
router.post('/:id/unfollow', authMiddleware, unfollowUser);

module.exports = router;
