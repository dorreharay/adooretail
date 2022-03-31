import store from '@store';
import API from '@api';
import {
  getFormattedDate,
  getStartOfPeriod,
  getEndOfPeriod,
  getIsBetween,
} from '@dateFormatter';
import { setProducts } from '@reducers/AccountReducer';
import { deleteSyncedSessions } from '@reducers/SessionReducer';
import {
  setEndOfSessionStatus,
  setSessionModalState,
  setModalStatus,
} from '@reducers/TempReducer';

function getState(reducer) {
  return store.getState()[reducer];
}

function chunkArray(myArray, chunk_size) {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

export function updateLayout(products) {
  const dispatch = store.dispatch;

  const account = getState('account');
  const orders = getState('orders');

  const { layout } = orders;

  if (!products) {
    if (account) {
      products = account?.products;
    }
  }

  if (!products?.length) return;

  const flattenedProducts = products.flat();

  const sortedProducts = flattenedProducts.sort(
    (a, b) => b.sortIndex - a.sortIndex,
  );

  const newProducts = chunkArray(sortedProducts, layout);

  dispatch(setProducts(newProducts));

  return newProducts;
}

export const loadProducts = async toastRef => {
  try {
    const orders = getState('orders');
    const account = getState('account');

    const { layout } = orders;

    if (toastRef) {
      toastRef.show('Синхронізація', DURATION.FOREVER);
    }

    const data = await API.getProducts({ token: account._id });

    console.log('data', data);

    if (!data) {
      if (toastRef) {
        toastRef.close();
      }

      return null;
    }

    updateLayout(data, layout);
  } catch (error) {
    console.warn('Failed to fetch products', error);
    if (toastRef) {
      toastRef.show('Помилка мережі', 1000);
    }
  } finally {
    if (toastRef) {
      toastRef.close();
    }
  }
};

export async function syncSessions() {
  if (!store) return;

  const currentStore = store.getState();
  const dispatch = store.dispatch;

  if (!currentStore?.account) return;

  let { list } = currentStore.sessions;
  const { _id } = currentStore.account;

  list = list.filter(item => !!item);

  try {
    const data = await API.synchronizeSessions({
      client_id: _id,
      local_sessions: list,
    });

    if (!data) return null;

    if (data?.todelete?.length) {
      dispatch(deleteSyncedSessions(data?.todelete));
    }
  } catch (error) {
    console.log(error);
  }
}

export function validateByRoute(shift_start, shift_end, callback = () => {}) {
  const currentStore = store.getState();
  const dispatch = store.dispatch;

  const { currentAccount } = currentStore.user;

  if (currentAccount) {
    validateSessionRoutine(shift_start, shift_end, callback);
    callback();
  } else {
    callback();
  }
}

export function validateSessionRoutine(shift_start, shift_end, callback) {
  const dispatch = store.dispatch;
  const currentStore = store.getState();
  const { currentAccount } = currentStore.user;
  const { modalStatus } = currentStore.temp;

  if (!currentAccount) return;

  const { localSessions, settings } = currentAccount;

  if (localSessions.length === 0) return false;

  const currentAccountSession = localSessions[localSessions.length - 1];

  if (currentAccountSession.endTime) return true;

  let startOfShift = '';
  let endOfShift = '';

  if (!shift_start || !shift_end) {
    shift_start = currentAccount?.shift_start;
    shift_end = currentAccount?.shift_end;
  }

  if (settings.shifts.enabled) {
    startOfShift = getFormattedDate('YYYY-MM-DD HH:mm', {
      hours: shift_start.hours,
      minutes: shift_start.minutes,
      seconds: 0,
    });
    endOfShift = getFormattedDate('YYYY-MM-DD HH:mm', {
      hours: shift_end.hours,
      minutes: shift_end.minutes,
      seconds: 0,
    });
  } else {
    startOfShift = getStartOfPeriod('YYYY-MM-DD HH:mm', 'day');
    endOfShift = getEndOfPeriod('YYYY-MM-DD HH:mm', 'day');
  }

  // console.log('Shift validation', '- check enabled?', settings.shifts.enabled)
  // console.log('%c%s', 'color: #E7715E; font: 0.8rem Tahoma;', `${getFormattedDate('HH:mm', startOfShift)}  ------>  ${getFormattedDate('HH:mm', endOfShift)}`)

  const isValid =
    getIsBetween(currentAccountSession.startTime, startOfShift, endOfShift) &&
    getIsBetween(null, startOfShift, endOfShift);

  if (!isValid) {
    dispatch(setModalStatus(true));
    dispatch(setSessionModalState(true));
    dispatch(setEndOfSessionStatus(true));
  }

  callback && callback();
}

function getLastItems(array, slice) {
  let offset = 0;

  if (array.length >= slice) {
    offset = array.length - slice;
  }

  return array.slice(offset, array.length);
}

export function dbidGenerator() {
  let S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + S4() + S4() + S4() + S4();
}
