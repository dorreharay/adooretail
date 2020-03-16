import _ from 'lodash'
import NetInfo from "@react-native-community/netinfo"
import DeviceInfo from "react-native-device-info"
import httpClient from './index'

const API = {
  async getProducts(payload, token) {
    if(!token) return null

    return await asyncAxiosCall(`/user/products/${token}`, payload)
  },
  async synchronizeSessions(payload, token) {
    if(!token) return null

    return await asyncAxiosCall(`/user/synchronizeSessions/${token}`, payload)
  },
  async sendReceiptByEmail(payload, token) {
    return await asyncAxiosCall(`/user/receipt/${token}`, payload)
  },
  async requestAccount(payload) {
    return await asyncAxiosCall('/user/requestAccount', payload)
  },
  async getSessions(payload) {
    return await asyncAxiosCall(`/user/getSessions/${payload.token}`, payload)
  },
}

export default API


async function asyncAxiosCall(event, payload) {
  const deviceToken = await DeviceInfo.getUniqueId();
  const connectionState = await NetInfo.fetch().then(state => state.isConnected);

  if (!connectionState) {
    return null;
  }

  try {
    const data = _.extend(payload, {}, { device_token: deviceToken });

    console.log('Rest call ==>', event, data);
    const result = await httpClient.post(event, { ...data });
    console.log('Response ==>', event, result.data);

    return result.data
  } catch (e) {
    throw e
  }
}
