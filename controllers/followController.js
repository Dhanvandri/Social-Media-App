const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Follow a user
exports.followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToFollow || currentUser.following.includes(userToFollow._id)) {
            return res.status(400).json({ message: 'Already following or user not found' });
        }

        currentUser.following.push(userToFollow._id);
        userToFollow.followers.push(currentUser._id);

        await currentUser.save();
        await userToFollow.save();

        // Send email notification
        sendEmail(userToFollow.email, 'New Follower', `${currentUser.username} is now following you!`);

        res.status(200).json({ message: 'User followed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if (!userToUnfollow || !currentUser.following.includes(userToUnfollow._id)) {
            return res.status(400).json({ message: 'Not following this user' });
        }

        currentUser.following = currentUser.following.filter(
            (id) => id.toString() !== userToUnfollow._id.toString()
        );
        userToUnfollow.followers = userToUnfollow.followers.filter(
            (id) => id.toString() !== currentUser._id.toString()
        );

        await currentUser.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
