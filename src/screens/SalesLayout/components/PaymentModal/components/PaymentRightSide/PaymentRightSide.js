import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';

import { PAYMENT_STATUSES } from '@constants';

import { setPaymentModalVisibility } from '@reducers/TempReducer';
import {
  setPaymentButtonAccessibility,
  setActivePaymentStatus,
} from '@reducers/OrderReducer';

import PaymentType from './PaymentType/PaymentType';
import DeliveryPicker from '../DeliveryPicker/DeliveryPicker';
import PaymentSubmit from '../PaymentSubmit';

function PaymentRightSide() {
  const dispatch = useDispatch();

  const activePaymentType = useSelector(
    state => state.orders.activePaymentType,
  );

  const settings = useSelector(state => state.user.settings);

  const handleClose = () => {
    dispatch(setPaymentModalVisibility(false));
    dispatch(setActivePaymentStatus(PAYMENT_STATUSES.WAITING));
    dispatch(setPaymentButtonAccessibility(true));
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          {activePaymentType.index !== 2
            ? 'Деталі оплати'
            : 'Відскануйте QR-код'}
        </Text>

        <View style={styles.cancelButton}>
          <TouchableOpacity
            style={styles.cancelButtonInner}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PaymentType />

      {settings?.delivery_use && (
        <>
          <Text
            style={[styles.headingText, { paddingTop: 10, paddingBottom: 15 }]}
          >
            Сервіс доставки
          </Text>
          <DeliveryPicker />
        </>
      )}

      <PaymentSubmit />
    </View>
  );
}

export default PaymentRightSide;
