const initialState = {
    followers: [],
    following: [],
    loading: false,
    error: null,
};

export const followReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FOLLOW_REQUEST':
        case 'UNFOLLOW_REQUEST':
            return { ...state, loading: true };

        case 'FOLLOW_SUCCESS':
            return {
                ...state,
                loading: false,
                followers: [...state.followers, action.payload],
            };

        case 'UNFOLLOW_SUCCESS':
            return {
                ...state,
                loading: false,
                followers: state.followers.filter(
                    (user) => user._id !== action.payload._id
                ),
            };

        case 'FOLLOW_FAIL':
        case 'UNFOLLOW_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default followReducer;
