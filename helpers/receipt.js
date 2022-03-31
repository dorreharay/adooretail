import store from '@store';
import BackgroundTimer from 'react-native-background-timer';

import { setBuffer, setOldReceipt } from '@reducers/TempReducer';
import { removeCurrentReceiptId } from '@reducers/OrderReducer';
import { setCurrentService } from '@reducers/UserReducer';
import { saveReceiptData } from '@reducers/SessionReducer';

import { printReceipt } from '@printer';

function getState(reducer) {
  return store.getState()[reducer];
}

const getLastSession = () => {
  const sessions = getState('sessions').list;

  if (!sessions?.length) return null;

  return sessions.slice(-1)[0];
};

export default async function saveReceipt() {
  const dispatch = store.dispatch;

  const {
    receipts,
    activeReceiptIndex,
    activePaymentType,
    receiptsIds,
    toBePaidSum,
    enteredSum,
  } = getState('orders');
  const { currentEmployee, currentService, settings } = getState('user');
  const { employees, delivery_services } = getState('account');
  const { buffer, oldReceiptState } = getState('temp');

  const lastSession = getLastSession();

  const activeReceipt = receipts[activeReceiptIndex];

  const receiptSum = activeReceipt?.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0,
  );

  const firstReceipt = activeReceipt[0];

  const lastReceipt = activeReceipt[activeReceipt?.length - 1];
  const timeStart = firstReceipt?.time;
  const timeEnd = lastReceipt?.time;

  const receiptId = receiptsIds[activeReceiptIndex];

  const payload = {
    payment_type: activePaymentType?.apiName,
    receipt: activeReceipt,
    total: toBePaidSum,
    initial: receiptSum,
    input: parseFloat(enteredSum),
    change: +(+enteredSum - +receiptSum).toFixed(2).replace('.00', ''),
    hash_id: receiptId,
    first_product_time: timeStart,
    last_product_time: timeEnd,
    transaction_time_end: new Date().toISOString(),
    employee: employees ? employees[currentEmployee] : '',
    service: delivery_services ? delivery_services[currentService]._id : '',
    session_id: lastSession?.session_id,
  };

  if (!payload) {
    return;
  }

  try {
    if (settings?.printer_enabled) {
      await printReceipt(payload);
    }

    dispatch(removeCurrentReceiptId());

    const newBuffer = buffer.map((item, index) =>
      index === activeReceiptIndex ? null : item,
    );

    dispatch(setBuffer(newBuffer));

    const newOldReceipt = oldReceiptState.map((item, index) =>
      index === activeReceiptIndex ? null : item,
    );

    dispatch(setOldReceipt(newOldReceipt));

    BackgroundTimer.setTimeout(() => {
      dispatch(saveReceiptData(payload));
      dispatch(setCurrentService(0));
    }, 300);
  } catch (error) {
    throw new Error();
  }
}
