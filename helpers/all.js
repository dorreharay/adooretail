import store from '@store'
import API from '@api'
import { DURATION } from 'react-native-easy-toast'
import { getFormattedDate, getStartOfPeriod, getEndOfPeriod, getIsBetween, } from '@dateFormatter'
import { START, END, NOT_ON_SHIFT } from '@statuses'
import { syncDataWithStore, setNeedToReenter, setProducts, } from '@reducers/UserReducer'
import { setModalStatus } from '@reducers/TempReducer'
import { setEndOfSessionStatus, setSessionModalState, } from '@reducers/TempReducer'

function getState(reducer) {
  return store.getState()[reducer]
}

function chunkArray(myArray, chunk_size) {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

export function updateLayout(products) {
  const dispatch = store.dispatch

  const user = getState('user')
  const orders = getState('orders')

  const { layout } = orders

  if (!products) {
    const { currentAccount } = user

    if (currentAccount) {
      products = currentAccount.products
    }
  }

  if (!products) return 

  const flattenedProducts = products.flat()

  const sortedProducts = flattenedProducts.sort((a, b) => b.sortIndex - a.sortIndex)

  const newProducts = chunkArray(sortedProducts, layout);

  dispatch(setProducts(newProducts))

  return newProducts
}

export const loadProducts = async (toastRef) => {
  try {
    const orders = getState('orders')

    const { layout } = orders

    if(toastRef) {
      toastRef.show("Синхронізація", DURATION.FOREVER);
    }

    const data = await API.getProducts()

    if (!data) {
      if(toastRef) {
        toastRef.close()
      }

      return null
    }

    updateLayout(data, layout)
  } catch (error) {
    console.warn('Failed to fetch products', error)
    if(toastRef) {
      toastRef.show("Помилка мережі", 1000);
    }
  } finally {
    if(toastRef) {
      toastRef.close()
    }
  }
}

export async function syncSessions(callback, newLocalSessions, customOffset) {
  if (!store) return

  const currentStore = store.getState()
  const dispatch = store.dispatch

  const { currentAccount } = currentStore.user
  const { currentRoute, } = currentStore.temp

  if (!currentAccount) {
    callback()

    return
  }

  const { localSessions, settings, passcode } = currentAccount

  try {
    const data = await API.synchronizeSessions({
      localSessions: getLastItems(newLocalSessions ? newLocalSessions : localSessions, customOffset ? customOffset : 5),
      newSettings: settings,
    }, currentAccount.id)

    if (!data) return null

    const { shift_start, shift_end, client_data, } = data
    const { passcode: clientPasscode } = client_data

    dispatch(syncDataWithStore(data, shift_start, shift_end))

    if (currentAccount) {
      if (clientPasscode != passcode) {
        dispatch(setNeedToReenter(true))
      }
    }

    validateByRoute(shift_start, shift_end, callback)
  } catch (error) {
    console.log(error)
    validateByRoute(currentAccount.shift_start, currentAccount.shift_end, callback)
  }
}

export function validateByRoute(shift_start, shift_end, callback = () => { }) {
  const currentStore = store.getState()
  const dispatch = store.dispatch

  const { currentAccount, } = currentStore.user

  if (currentAccount) {
    validateSessionRoutine(shift_start, shift_end, callback)
    callback()
  } else {
    callback()
  }
}

export function validateSessionRoutine(shift_start, shift_end, callback) {
  const dispatch = store.dispatch
  const currentStore = store.getState()
  const { currentAccount } = currentStore.user
  const { modalStatus } = currentStore.temp

  if (!currentAccount) return

  const { localSessions, settings } = currentAccount

  if (localSessions.length === 0) return false

  const currentAccountSession = localSessions[localSessions.length - 1]

  if (currentAccountSession.endTime) return true

  let startOfShift = ''
  let endOfShift = ''

  if (!shift_start || !shift_end) {
    shift_start = currentAccount.shift_start
    shift_end = currentAccount.shift_end
  }

  if (settings.shifts.enabled) {
    startOfShift = getFormattedDate('YYYY-MM-DD HH:mm', { hours: shift_start.hours, minutes: shift_start.minutes, seconds: 0, })
    endOfShift = getFormattedDate('YYYY-MM-DD HH:mm', { hours: shift_end.hours, minutes: shift_end.minutes, seconds: 0, })
  } else {
    startOfShift = getStartOfPeriod('YYYY-MM-DD HH:mm', 'day')
    endOfShift = getEndOfPeriod('YYYY-MM-DD HH:mm', 'day')
  }

  // console.log('Shift validation', '- check enabled?', settings.shifts.enabled)
  // console.log('%c%s', 'color: #E7715E; font: 0.8rem Tahoma;', `${getFormattedDate('HH:mm', startOfShift)}  ------>  ${getFormattedDate('HH:mm', endOfShift)}`)

  const isValid = getIsBetween(currentAccountSession.startTime, startOfShift, endOfShift) && getIsBetween(null, startOfShift, endOfShift)

  if (isValid) {
    dispatch(setModalStatus(false))
    dispatch(setSessionModalState(false))
    dispatch(setEndOfSessionStatus(false))
  }

  if (!isValid) {
    dispatch(setModalStatus(true))
    dispatch(setSessionModalState(true))
    dispatch(setEndOfSessionStatus(true))
  }

  callback && callback()
}

function getLastItems(array, slice) {
  let offset = 0

  if (array.length >= slice) {
    offset = array.length - slice
  }

  return array.slice(offset, array.length)
}