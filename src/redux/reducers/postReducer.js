import {
    FETCH_POSTS_SUCCESS,
    CREATE_POST_SUCCESS,
    LIKE_POST,
    ADD_COMMENT,
} from '../actions/postActions';

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return { ...state, posts: action.payload, loading: false };
        case CREATE_POST_SUCCESS:
            return { ...state, posts: [action.payload, ...state.posts] };
        case LIKE_POST:
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
            };
        default:
            return state;
    }
};

export default postReducer;
