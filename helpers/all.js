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

const getLastSession = () => {
  const sessions = getState('sessions').list;

  if (!sessions?.length) return null;

  return sessions.slice(-1)[0];
};

export function validateSession() {
  console.log('=====>')
  const dispatch = store.dispatch;
  const account = getState('account');
  const sessionModalVisible = getState('temp');
  const lastSession = getLastSession();

  if (!account) return;

  if (!lastSession) {
    dispatch(setSessionModalState(true));
    return;
  }

  const startOfShift = getStartOfPeriod('day');
  const endOfShift = getEndOfPeriod('day');

  const isValid =
    getIsBetween(lastSession?.summary?.time_start, startOfShift, endOfShift) &&
    getIsBetween(null, startOfShift, endOfShift);

  if (!isValid) {
    dispatch(setModalStatus(true));
    dispatch(setSessionModalState(true));
    dispatch(setEndOfSessionStatus(true));
  }
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
