import _ from 'lodash'
import store from '@store'
import NetInfo from "@react-native-community/netinfo"
import DeviceInfo from "react-native-device-info"
import httpClient from './index'

const API = {
  async requestAccount(payload) {
    return await asyncAxiosCall('/user/requestAccount', payload, { hasToken: false })
  },
  async synchronizeSessions(payload) {
    return await asyncAxiosCall(`/user/synchronizeSessions`, payload)
  },
  async getProducts(payload) {
    return await asyncAxiosCall(`/user/products`, payload)
  },
  async getSessions(payload) {
    return await asyncAxiosCall(`/user/getSessions`, payload)
  },
  async sendReceiptByEmail(payload) {
    return await asyncAxiosCall(`/user/receipt`, payload)
  },
  async getDayReceipts(payload) {
    return await asyncAxiosCall(`/owner/getDayReceipts`, payload)
  },
}

export default API


async function asyncAxiosCall(event, payload, options = {}) {
  const { hasToken = true } = options

  const deviceToken = await DeviceInfo.getUniqueId();
  const { isConnected } = await NetInfo.fetch()

  const { currentAccount } = store.getState().user

  const token = currentAccount ? currentAccount.id : null

  if (!token && hasToken) {
    console.log('%c No access token' + '%c - asyncAxiosCall()', 'background: #D8664D; color: #FFFFFF', '');

    return null;
  }

  if (!isConnected) {
    console.log('%c No connection ' + '%c - asyncAxiosCall()', 'background: #3F0B81; color: #FFFFFF', '');

    return null;
  }

  try {
    const data = _.extend(payload, {}, { device_token: deviceToken });

    event = event + `/${hasToken ? token : ''}`

    console.log('Rest call ==>', event, data);
    const result = await httpClient.post(event, { ...data });
    console.log('Response ==>', event, result.data);

    return result.data
  } catch (e) {
    throw e
  }
}
