import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import postReducer from './reducers/postReducer';
import chatReducer from './reducers/chatReducer'; // Import chatReducer

// Combine reducers
const rootReducer = combineReducers({
    posts: postReducer,
    chat: chatReducer, // Add chat reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
