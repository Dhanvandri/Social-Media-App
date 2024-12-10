module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('sendMessage', (data) => {
            io.emit('receiveMessage', data); // Broadcast message to all connected users
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
