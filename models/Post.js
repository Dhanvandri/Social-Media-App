const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    fileUrl: { type: String }, // URL for uploaded file
    fileType: { type: String }, // Type: image/jpeg, video/mp4, etc.
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
