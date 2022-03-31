import _ from 'lodash'
import store from '@store'
import NetInfo from "@react-native-community/netinfo"
import DeviceInfo from "react-native-device-info"
import httpClient from './index'

const API = {
  async requestAccount(payload) {
    return await asyncAxiosCall('/client/account/get', payload)
  },
  async synchronizeSessions(payload) {
    return await asyncAxiosCall(`/client/sync`, payload)
  },
  async getProducts(payload) {
    return await asyncAxiosCall(`/client/products/get`, payload)
  },
  async getStatistics(payload) {
    return await asyncAxiosCall(`/client/statistics/get`, payload)
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
  async getDayDetails(payload) {
    return await asyncAxiosCall(`/owner/getDayDetails`, payload)
  },
}

export default API


async function asyncAxiosCall(event, payload) {
  try {
    console.log('Rest call ==>', event, payload);
    const result = await httpClient.post(event, { ...payload });
    console.log('Response ==>', event, result.data);

    return result.data
  } catch (e) {
    throw e
  }
}
