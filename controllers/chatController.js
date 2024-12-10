const Chat = require('../models/Chat');

exports.getChatHistory = async (req, res) => {
    try {
        const chats = await Chat.find().sort({ createdAt: 1 }).limit(50);
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
