import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import styles from './styles';

import {
  setActivePaymentType,
  setEmployeesListVisibility,
} from '@reducers/OrderReducer';

import { PAYMENT_TYPES } from '@constants';

import EditIcon from '@images/edit.svg';

import SharedButton from '@shared/SharedButton';

function PaymentLeftSide() {
  const dispatch = useDispatch();

  const activePaymentType = useSelector(
    state => state.orders.activePaymentType,
  );
  const settings = useSelector(state => state.user.settings);
  const currentEmployee = useSelector(state => state.user.currentEmployee) || 0;
  const account = useSelector(state => state.account);

  const [availablePaymentTypes, setAvailablePaymentTypes] = useState([]);

  useEffect(() => {
    if (settings?.payment_type_cash && settings?.payment_type_debit) {
      setAvailablePaymentTypes([PAYMENT_TYPES.CASH, PAYMENT_TYPES.DEBIT])
    } else if (settings?.payment_type_cash && !settings?.payment_type_debit) {
      setAvailablePaymentTypes([PAYMENT_TYPES.CASH])
      dispatch(setActivePaymentType(PAYMENT_TYPES.CASH))
    } else if (!settings?.payment_type_cash && settings?.payment_type_debit) {
      setAvailablePaymentTypes([PAYMENT_TYPES.DEBIT])
      dispatch(setActivePaymentType(PAYMENT_TYPES.DEBIT))
    } else if (!settings?.payment_type_cash && !settings?.payment_type_debit) {
      setAvailablePaymentTypes([PAYMENT_TYPES.CASH])
      dispatch(setActivePaymentType(PAYMENT_TYPES.CASH))
    }
  }, [settings]);

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { marginTop: '15%' }]}>Спосіб оплати</Text>

      <View style={{ marginTop: '10%' }}>
        {availablePaymentTypes.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.paymentType,
              activePaymentType.key === item.key && { backgroundColor: '#2E2C2E' },
            ]}
            onPress={() => dispatch(setActivePaymentType(item))}
            activeOpacity={1}
            key={index}
          >
            {item.imageSource && (
              <FastImage
                style={[
                  { width: 30, height: 30, marginRight: 15 },
                  activePaymentType.key !== item.key && { opacity: 0.5 },
                ]}
                source={item.imageSource}
              />
            )}

            <Text
              style={[
                styles.paymentTypeName,
                activePaymentType.key === item.key && { color: '#FFFFFF' },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <View
          style={{
            position: 'relative',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: '5%',
            marginBottom: 0,
          }}
        >
          <Text style={styles.heading}>Працівник</Text>
          <SharedButton
            style={styles.editButton}
            onPress={() => dispatch(setEmployeesListVisibility(true))}
          >
            <EditIcon width={13} height={13} />
          </SharedButton>
        </View>

        <TouchableOpacity
          style={styles.currentEmployee}
          onPress={() => dispatch(setEmployeesListVisibility(true))}
          activeOpacity={0.7}
        >
          <View style={styles.currentEmployeeImageWrapper}>
            <FastImage
              style={styles.currentEmployeeImage}
              source={{
                uri: (account && account?.client_data?.img_url) || '',
              }}
            />
            <View style={styles.currentEmployeeBorder} />
          </View>

          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.currentEmployeeName}
          >
            {account && account?.employees
              ? account?.employees[currentEmployee].name
              : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PaymentLeftSide;
