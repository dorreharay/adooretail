import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';

import { setActivePaymentStatus } from '@reducers/OrderReducer';

import { PAYMENT_STATUSES } from '@constants';

function CardPaymentStatus() {
  const dispatch = useDispatch();

  const activePaymentStatus = useSelector(
    state => state.orders.activePaymentStatus,
  );
  const activePaymentType = useSelector(
    state => state.orders.activePaymentType,
  );

  const [statusDotOpacity, setStatusDotOpacity] = useState(
    new Animated.Value(1),
  );

  const stopBlinking = () => {
    statusDotOpacity.stopAnimation();
    setStatusDotOpacity(new Animated.Value(1));
  };

  useEffect(() => {
    return () => {
      stopBlinking();
      dispatch(setActivePaymentStatus(PAYMENT_STATUSES.WAITING));
    };
  }, []);

  useEffect(() => {
    if (activePaymentStatus.index === 1) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(statusDotOpacity, {
            toValue: 0,
            duration: 500,
          }),
          Animated.timing(statusDotOpacity, {
            toValue: 1,
            duration: 500,
          }),
        ]),
        {
          iterations: 300,
        },
      ).start();
    }
  }, [activePaymentStatus]);

  useEffect(() => {
    if (!activePaymentStatus?.blinking) {
      stopBlinking();
    }
  }, [activePaymentStatus?.blinking]);

  if (activePaymentType?.key !== 1) return null;

  return (
    <View
      style={[
        styles.secondContainer,
        { justifyContent: 'space-between', paddingRight: '7%' },
      ]}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}
        >
          <Animated.View
            style={[
              styles.statusDot,
              { backgroundColor: activePaymentStatus?.statusColor },
              { opacity: statusDotOpacity },
            ]}
          />
          <Text style={styles.waitingText}>
            {activePaymentStatus?.statusText}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CardPaymentStatus;
