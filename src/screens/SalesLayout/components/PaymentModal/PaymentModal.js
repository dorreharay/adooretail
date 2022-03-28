import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import store from '@store';
import styles from './styles';

import { setPaymentModalVisibility } from '@reducers/TempReducer';
import { setToBePaidSum, setEnteredSum, setActivePaymentStatus } from '@reducers/OrderReducer';

import { PAYMENT_STATUSES } from '@constants';

import PaymentLeftSide from './components/PaymentLeftSide/PaymentLeftSide';
import PaymentRightSide from './components/PaymentRightSide/PaymentRightSide';
import EmployeePicker from './components/EmployeePicker/EmployeePicker';

const PaymentModal = () => {
  const dispatch = useDispatch();

  const paymentModalVisibility = useSelector(
    state => state.temp.paymentModalVisibility,
  );

  useEffect(() => {
    if (paymentModalVisibility) {
      dispatch(setActivePaymentStatus(PAYMENT_STATUSES.WAITING));

      const orders = store.getState().orders;
      const { receipts, activeReceiptIndex } = orders;

      const activeReceipt = receipts[activeReceiptIndex];

      const receiptSum = activeReceipt?.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0,
      );

      dispatch(setToBePaidSum(receiptSum));
      dispatch(setEnteredSum(receiptSum));
    }
  }, [paymentModalVisibility]);

  const handleClickOutSide = () => {
    dispatch(setPaymentModalVisibility(false));
  };

  return (
    <View
      style={[
        styles.paymentWrapperContainer,
        { top: 4000 },
        paymentModalVisibility && { top: 0 },
      ]}
    >
      <TouchableOpacity
        style={styles.paymentWrapper}
        onPress={handleClickOutSide}
        activeOpacity={1}
      />
      <KeyboardAwareScrollView
        style={styles.keyboardAwareScrollViewStyles}
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardOpeningTime={0}
        enableOnAndroid={true}
      >
        <View style={styles.paymentModal}>
          <PaymentLeftSide />
          <PaymentRightSide />
        </View>
      </KeyboardAwareScrollView>
      <EmployeePicker />
    </View>
  );
};

export default PaymentModal;
