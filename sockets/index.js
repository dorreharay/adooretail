import io from 'socket.io-client';

let socket = null;

export function getSocket() {
  if (!socket) {

    console.log('Socket.io connecting to', 'http://localhost');
    socket = io.connect('http://192.168.1.107:3000', {
      path: '',
      jsonp: false,
      agent: '-',
      pfx: '-',
      rejectUnauthorized: '-',
      perMessageDeflate: '-',
      passphrase: '-',
      cert: '-',
      ca: '-',
      ciphers: '-',
      transports: ['websocket'],
      timeout: 5000, // 5 seconds should be enough
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
      randomizationFactor: 0,
      autoConnect: true
    });
  }

  return socket;
}

export const setupSocket = () => {

  if (socket) {
    return
  }

  socket = getSocket();

  socket.emit('ping', () => 'lox')

  socket.on('connect_failed', function () {
    console.error('[Socket.io] connect_failed');
    // store.dispatch(changeConnectionStatus({ status: false, socketId: '' }));
  });

  socket.on('connect', function () {
    console.log('Socket.io connected to ' + 'localhost');
    // store.dispatch(changeConnectionStatus({ status: true, socketId: socket.id }));
  });

  socket.on('disconnect', function () {
    console.log('Socket.io disconnected from ' + 'localhost');
    // store.dispatch(changeConnectionStatus({ status: false, socketId: '' }));
  });

  socket.on('close', function () {
    console.log('Socket.io closed connection to ' + 'localhost');
    // store.dispatch(changeConnectionStatus({ status: false, socketId: '' }));
  });

  socket.on('reconnect', function () {
    console.log('Attempting to reconnect to ' + 'localhost');
    // store.dispatch(changeConnectionStatus({ status: false, socketId: '' }));
  });
};
