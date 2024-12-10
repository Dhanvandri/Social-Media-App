import axios from 'axios';

// Action Types
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const LIKE_POST = 'LIKE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';

// Fetch posts
export const fetchPosts = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/posts');
        dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }
};

// Create a new post
export const createPost = (content, file) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('content', content);
        if (file) formData.append('file', file);

        const token = localStorage.getItem('token');
        const { data } = await axios.post('/api/posts', formData, {
            headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
        });

        dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } catch (error) {
        console.error('Error creating post:', error.message);
    }
};

// Like a post
export const likePost = (postId) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`/api/posts/${postId}/like`, {}, {
            headers: { Authorization: token },
        });
        dispatch({ type: LIKE_POST, payload: data });
    } catch (error) {
        console.error('Error liking post:', error.message);
    }
};

// Add a comment
export const addComment = (postId, comment) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post(`/api/posts/${postId}/comment`, { comment }, {
            headers: { Authorization: token },
        });
        dispatch({ type: ADD_COMMENT, payload: data });
    } catch (error) {
        console.error('Error adding comment:', error.message);
    }
};
