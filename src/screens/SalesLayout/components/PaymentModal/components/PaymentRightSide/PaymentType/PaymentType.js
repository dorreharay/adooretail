import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles';

import {
  setPaymentButtonAccessibility,
  setEnteredSum,
} from '@reducers/OrderReducer';

import PaymentSubmit from '../../PaymentSubmit';
import CardPaymentStatus from '../CardPaymentStatus';

function PaymentType() {
  const dispatch = useDispatch()

  const activePaymentType = useSelector(state => state.orders.activePaymentType);
  const enteredSum = useSelector(state => state.orders.enteredSum);
  const toBePaidSum = useSelector(state => state.orders.toBePaidSum)

  const [isInvalidValue, setInvalidState] = useState(false);

  useEffect(() => {
    if (activePaymentType.index === 1) {
      dispatch(setPaymentButtonAccessibility(true));
      return;
    }

    if (+enteredSum >= toBePaidSum) {
      dispatch(setPaymentButtonAccessibility(true));
      setInvalidState(false);
    }

    if (+enteredSum < toBePaidSum) {
      dispatch(setPaymentButtonAccessibility(false));
      setInvalidState(true);
    }
  }, [enteredSum, activePaymentType]);

  const handleChangeSum = value => {
    value = value.replace(/[^0-9.]/g, '');

    const splittedValue = value.split('');
    const dotsAmount = splittedValue.filter(item => item === '.').length;

    if (dotsAmount > 1) {
      return;
    }

    const dotIndex = value.indexOf('.');
    const valueBeforeDot = value.slice(0, dotIndex);
    const valueAfterDot = value.slice(dotIndex);

    if (valueBeforeDot.length >= 5) return;
    if (valueAfterDot.length > 3) return;

    dispatch(setPaymentButtonAccessibility(false));

    dispatch(setEnteredSum(value));
  };

  return (
    <>
      <View style={styles.totalDetails}>
        <View style={styles.toByPaid}>
          <Text style={styles.toByPaidText}>{toBePaidSum} грн до сплати</Text>
        </View>

        {activePaymentType?.key === 0 && (
          <View
            style={[
              styles.secondContainer,
              { justifyContent: 'space-between', paddingRight: '7%' },
            ]}
          >
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <TextInput
                style={[
                  styles.paidInput,
                  isInvalidValue
                    ? { color: '#E35E62', borderColor: '#E35E62' }
                    : { color: '#39B14C', borderColor: '#39B14C' },
                ]}
                value={`${enteredSum}`}
                onChangeText={handleChangeSum}
                keyboardType="number-pad"
                maxLength={6}
                textAlign={'center'}
                onFocus={() => {
                  handleChangeSum('');
                }}
                onBlur={() => {
                  if (enteredSum == '') {
                    handleChangeSum(`${toBePaidSum}`);
                  }
                }}
              />
              <Text style={styles.paidText}>грн внесено</Text>
            </View>
            <Text style={styles.changeText}>
              Решта: {(+enteredSum - toBePaidSum).toFixed(2).replace('.00', '')}
            </Text>
          </View>
        )}

        <CardPaymentStatus />
      </View>

      <PaymentSubmit />
    </>
  );
}

export default PaymentType;
