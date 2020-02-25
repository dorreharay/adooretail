import io from 'socket.io-client';

let socket = null;

const api = 'http://192.168.1.197:4100'

export function getSocket() {
  if (!socket) {
    console.log('Socket.io connecting to', api);
    socket = io.connect(api, {
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

  console.log('%c%s', 'color: red; font: 1.5rem Tahoma;', 'connecting')

  socket = getSocket();

  console.log('%c%s', 'color: green; font: 1.5rem Tahoma;', 'connected')

  // socket.emit('message', 'message')

  socket.on('connect_failed', function () {
    console.error('[Socket.io] connect_failed');
    // store.dispatch(changeConnectionStatus({ status: false, socketId: '' }));
  });

  socket.on('connect', function () {
    console.log('Socket.io connected to ' + api);
    // store.dispatch(changeConnectionStatus({ status: true, socketId: socket.id }));
  });

  socket.on('disconnect', function () {
    console.log('Socket.io disconnected from ' + api);
    // store.dispatch(changeConnectionStatus({ status: false, socketId: '' }));
  });

  socket.on('close', function () {
    console.log('Socket.io closed connection to ' + api);
    // store.dispatch(changeConnectionStatus({ status: false, socketId: '' }));
  });

  socket.on('reconnect', function () {
    console.log('Attempting to reconnect to ' + api);
    // store.dispatch(changeConnectionStatus({ status: false, socketId: '' }));
  });
};
