import store from '@store'
import API from '@api'
import { syncDataWithStore, setNeedToReenter, } from '@reducers/UserReducer'
import { setModalStatus } from '@reducers/TempReducer'
import { getFormattedDate, getStartOfPeriod, getEndOfPeriod, getIsBetween, } from '@dateFormatter'
import { START, END, NO_TIME } from '@statuses'

export async function syncSessions(callback, newLocalSessions, customOffset) {
  if (!store) return

  const currentStore = store.getState()
  const dispatch = store.dispatch

  const { accounts, currentAccountToken, currentAccountIndex, } = currentStore.user
  const { currentRoute, } = currentStore.temp

  if (accounts.length === 0) {
    callback()

    return
  }

  const currentAccount = accounts[currentAccountIndex]

  const { localSessions, settings, passcode } = currentAccount

  try {
    const data = await API.synchronizeSessions({
      localSessions: getLastItems(newLocalSessions ? newLocalSessions : localSessions, customOffset ? customOffset : 5),
      newSettings: settings,
    }, currentAccountToken)

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

export function validateByRoute(shift_start, shift_end, callback) {
  const currentStore = store.getState()
  const dispatch = store.dispatch

  const { accounts, } = currentStore.user
  const { currentRoute, } = currentStore.temp

  if (accounts.length !== 0) {
    validateSessionRoutine(shift_start, shift_end, callback)
    callback()
  } else {
    callback()
  }
}

export function validateSessionRoutine(shift_start, shift_end, callback) {
  const dispatch = store.dispatch
  const currentStore = store.getState()
  const { accounts, currentAccountIndex, } = currentStore.user
  const { modalStatus } = currentStore.temp
  const currentAccount = accounts[currentAccountIndex]

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

  console.log('Shift validation', '- check enabled?', settings.shifts.enabled)
  console.log('%c%s', 'color: #E7715E; font: 0.8rem Tahoma;', `${getFormattedDate('HH:mm', startOfShift)}  ------>  ${getFormattedDate('HH:mm', endOfShift)}`)

  const isValid = getIsBetween(currentAccountSession.startTime, startOfShift, endOfShift) && getIsBetween(null, startOfShift, endOfShift)

  if (isValid && modalStatus !== '') {
    dispatch(setModalStatus(''))
  }

  console.log(currentAccount.localSessions)

  if (!isValid) {
    if (currentAccount.localSessions.length === 0) {
      dispatch(setModalStatus(START))
    } else {
      dispatch(setModalStatus(END))
    }
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