import socketIOClient from 'socket.io-client';

const Socket = (handleMessage, initialData) => {
    const socketEndpoint = 'http://127.0.0.1:3500';
    const socket = socketIOClient(socketEndpoint);
    if (initialData) {
        socket.on('connect', () => {
            socket.emit('message', initialData);
        });
    } else {
        console.warn('Initial data was not provided to socket. Did you mean to use initial data?');
    }
    socket.open();
    socket.on('message', (data) => handleMessage(data));

    return socket;
}

export default Socket;