import _ from 'lodash'
import { getSocket } from './index'
import DeviceInfo from "react-native-device-info";

const API = {
  async makePing(payload) {
    return await promisifiedSocketEmit('ping', payload)
  },
};

export default API

async function promisifiedSocketEmit(event, payload) {
  const deviceToken = await DeviceInfo.getUniqueId();

  return new Promise(((resolve, reject) => {
    const socket = getSocket()

    if (!socket) {
      throw Error('Socket not found')
    }

    const data = _.extend(payload, {}, { device_token: deviceToken });
    console.log('Call to socket ==>', event, data);

    return socket.emit(event, data, (err, result) => {
      if (err) {
        console.log(err);
        return resolve(null)
      }

      return resolve(result)
    })
  }))
}

export async function promisifiedSocketListener(event, payload) {
  return new Promise(((resolve, reject) => {
    const socket = getSocket()

    if (!socket) {
      throw Error('Socket not found')
    }

    console.log('Call to socket ==>', event, payload);

    return socket.on(event, (result) =>
      resolve(result))
  }))
}

export const subscribeToChannel = (channel, cb) => {
  console.log('Subscribe to channel', channel);
  const socket = getSocket();

  if (!socket) {
    return console.log(`Subscription failed to ${channel} problem with setup socket.`)
  }

  socket.on(channel, cb);
};

export const unsubscribeFromChannel = (channel) => {
  console.log('Unsubscribe from channel', channel);
  const socket = getSocket();

  if (!socket) {
    return console.log(`Subscription failed to ${channel} problem with setup socket.`)
  }

  socket.removeListener(channel);
};
