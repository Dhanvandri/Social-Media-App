import { SEND_MESSAGE, RECEIVE_MESSAGE, LOAD_MESSAGES } from '../actions/chatActions';

const initialState = {
    messages: [], 
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MESSAGES:
            return {
                ...state,
                messages: action.payload,
            };
        case SEND_MESSAGE:
        case RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
};

export default chatReducer;
