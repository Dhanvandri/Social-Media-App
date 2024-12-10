import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage, loadMessages } from '../redux/actions/chatActions';

const Chat = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat?.messages || []); // Prevent undefined error
    const [input, setInput] = useState('');

    useEffect(() => {
        dispatch(loadMessages([])); // Load initial messages
        dispatch(receiveMessage()); // Listen for incoming messages
    }, [dispatch]);

    const handleSend = () => {
        if (input.trim()) {
            dispatch(sendMessage(input));
            setInput('');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Chat</h2>
            <div style={styles.messages}>
                {messages.map((msg, index) => (
                    <p key={index} style={styles.message}>{msg}</p>
                ))}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    style={styles.input}
                />
                <button onClick={handleSend} style={styles.button}>Send</button>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ddd' },
    messages: { height: '300px', overflowY: 'auto', marginBottom: '10px', padding: '10px', background: '#f9f9f9' },
    message: { margin: '5px 0', fontSize: '14px' },
    inputContainer: { display: 'flex', gap: '10px' },
    input: { flex: 1, padding: '8px' },
    button: { padding: '8px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' },
};

export default Chat;
