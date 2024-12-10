import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likePost, addComment } from '../redux/actions/postActions';

const Post = ({ post }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    
    const handleLike = () => {
        dispatch(likePost(post._id)); // Dispatch like action
    };

    const handleComment = () => {
        if (comment.trim()) {
            dispatch(addComment(post._id, comment)); // Dispatch comment action
            setComment('');
        }
    };

    return (
        <div style={styles.container}>
            <h4>
                <Link to={`/profile/${post.user._id}`} style={styles.link}>
                    {post.user.username}
                </Link>
            </h4>
            <p>{post.content}</p>
            {post.fileUrl && (
                post.fileType.startsWith('image') ? (
                    <img src={post.fileUrl} alt="Post" style={styles.media} />
                ) : (
                    <video src={post.fileUrl} controls style={styles.media} />
                )
            )}
            <div style={styles.actions}>
                <button onClick={handleLike} style={styles.button}>
                    Like ({post.likes.length})
                </button>
                <div>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        style={styles.input}
                    />
                    <button onClick={handleComment} style={styles.button}>Comment</button>
                </div>
            </div>
            <div>
                <h5>Comments:</h5>
                {post.comments.map((c, index) => (
                    <p key={index}>{c}</p>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' },
    link: { color: '#007bff', textDecoration: 'none' },
    media: { width: '100%', borderRadius: '5px', marginTop: '10px' },
    actions: { marginTop: '10px' },
    button: { margin: '5px', padding: '5px 10px', cursor: 'pointer', border: 'none', background: '#007bff', color: '#fff', borderRadius: '3px' },
    input: { marginTop: '10px', padding: '5px', width: '70%' },
};

export default Post;
