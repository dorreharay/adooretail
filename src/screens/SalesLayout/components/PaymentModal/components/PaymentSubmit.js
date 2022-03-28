import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import styles from '../styles';

import { activeReceiptSelector } from '@selectors';
import {
  clearCurrentReceipt,
  setPrintStatus,
  setPaymentModalVisibility,
} from '@reducers/TempReducer';
import { setPaymentButtonAccessibility } from '@reducers/OrderReducer';

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
  };

  const handleSubmit = async () => {
    if (!paymentButtonAccessibility) {
      return;
    }

    try {
      dispatch(setPrintStatus(true));
      // await saveReceipt(activePaymentType.apiName, activeReceipt);
      if (activePaymentType.key === 1) {
        BackgroundTimer.setTimeout(() => {
          resetToInitial()
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
