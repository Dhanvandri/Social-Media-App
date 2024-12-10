import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost } from '../redux/actions/postActions';
import Post from '../components/Post';

const Home = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);

    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleSubmit = () => {
        if (content.trim() || file) {
            dispatch(createPost(content, file));
            setContent('');
            setFile(null);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Create Post</h2>
            <div style={styles.form}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write something..."
                    style={styles.textarea}
                ></textarea>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={styles.fileInput}
                />
                <button onClick={handleSubmit} style={styles.button}>
                    Post
                </button>
            </div>

            <h2 style={styles.header}>Posts</h2>
            <div style={styles.postsContainer}>
                {posts.length > 0 ? (
                    posts.map((post) => <Post key={post._id} post={post} />)
                ) : (
                    <p style={styles.noPosts}>No posts available. Be the first to post!</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '30px',
    },
    textarea: {
        width: '100%',
        minHeight: '100px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box',
    },
    fileInput: {
        fontSize: '14px',
        padding: '5px',
        cursor: 'pointer',
    },
    button: {
        padding: '10px 15px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    postsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    noPosts: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#666',
    },
};

export default Home;
