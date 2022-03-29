import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import styles from '../styles';

import { PAYMENT_STATUSES } from '@constants';
import saveReceipt from '@receipt'

import {
  clearCurrentReceipt,
  setPrintStatus,
  setPaymentModalVisibility,
} from '@reducers/TempReducer';
import { setCurrentService } from '@reducers/UserReducer';
import { setPaymentButtonAccessibility, setActivePaymentStatus } from '@reducers/OrderReducer';

function PaymentSubmit() {
  const dispatch = useDispatch();

  const activePaymentType = useSelector(
    state => state.orders.activePaymentType,
  );
  const paymentButtonAccessibility = useSelector(
    state => state.orders.paymentButtonAccessibility,
  );

  const resetToInitial = () => {
    dispatch(clearCurrentReceipt());
    dispatch(setPaymentModalVisibility(false));
    dispatch(setPaymentButtonAccessibility(true));
    dispatch(setCurrentService(0));
  };

  const handleSubmit = async () => {
    if (!paymentButtonAccessibility) {
      return;
    }

    try {
      dispatch(setPrintStatus(true));
      saveReceipt();
      if (activePaymentType.key === 1) {
        dispatch(setActivePaymentStatus(PAYMENT_STATUSES.SUCCESS));
        BackgroundTimer.setTimeout(() => {
          resetToInitial()

          BackgroundTimer.setTimeout(() => {
            dispatch(setActivePaymentStatus(PAYMENT_STATUSES.WAITING));
          }, 300)
        }, 500);
      } else {
        resetToInitial()
      }

      dispatch(setPrintStatus(false));

    } catch (error) {
      dispatch(setPrintStatus(false));
    }
  };

  return (
    <View style={styles.paymentSubmitButton}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#DB3E69', '#EF9058']}
          style={[
            styles.paymentSubmitButtonGradient,
            !paymentButtonAccessibility && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.paymentSubmitButtonText}>Підтвердити</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default PaymentSubmit;
