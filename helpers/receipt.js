import store from '@store';
import BackgroundTimer from 'react-native-background-timer';

import { setBuffer, setOldReceipt } from '@reducers/TempReducer';
import { removeCurrentReceiptId } from '@reducers/OrderReducer';
import { syncReceipt, setCurrentService } from '@reducers/UserReducer';

import { printReceipt } from '@printer';
import { getFormattedDate } from '@dateFormatter';

function getState(reducer) {
  return store.getState()[reducer];
}

export default async function saveReceipt() {
  const dispatch = store.dispatch;

  const {
    receipts,
    activeReceiptIndex,
    activePaymentType,
    receiptsIds,
    toBePaid,
  } = getState('orders');
  const { settings } = getState('user');

  const activeReceipt = receipts[activeReceiptIndex];

  const receiptSum = activeReceipt?.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0,
  );

  const firstReceipt = activeReceipt[0];
  const lastReceipt = activeReceipt[activeReceipt?.length - 1];
  const timeStart = firstReceipt.time;
  const timeEnd = lastReceipt.time;

  const receiptId = receiptsIds[activeReceiptIndex];

  const payload = {
    payment_type: activePaymentType?.apiName,
    receipt: activeReceipt,
    total: toBePaid,
    initial: receiptSum,
    input: parseFloat(enteredSum),
    change: +(+enteredSum - receiptSum).toFixed(2).replace('.00', ''),
    hash_id: receiptId,
    first_product_time: timeStart,
    last_product_time: timeEnd,
    transaction_time_end: getFormattedDate('YYYY-MM-DD HH:mm:ss'),
    // employee: currentSession ? currentSession.employees[currentEmployee] : '',
    // service:
    //   currentAccount && currentAccount?.available_services
    //     ? currentAccount?.available_services[currentService].id
    //     : '',
  };

  if (!payload) {
    return;
  }

  const newBuffer = buffer.map((item, index) =>
    index === activeReceiptIndex ? null : item,
  );

  dispatch(setBuffer(newBuffer));

  const newOldReceipt = oldReceiptState.map((item, index) =>
    index === activeReceiptIndex ? null : item,
  );

  dispatch(setOldReceipt(newOldReceipt));

  try {
    if (settings.printer_enabled) {
      await printReceipt(payload);
    }

    dispatch(removeCurrentReceiptId());

    BackgroundTimer.setTimeout(() => {
      dispatch(syncReceipt(payload));
      dispatch(setCurrentService(0));
    }, 300);
  } catch (error) {
    throw new Error();
  }
}
