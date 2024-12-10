import socket from '../../services/socketService';

// Action Types
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';

// Action Creators
export const sendMessage = (message) => (dispatch) => {
    socket.emit('sendMessage', message);
    dispatch({ type: SEND_MESSAGE, payload: message });
};

export const receiveMessage = () => (dispatch) => {
    socket.on('receiveMessage', (message) => {
        dispatch({ type: RECEIVE_MESSAGE, payload: message });
    });
};

export const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    payload: messages,
});
