import React, { useState, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import FastImage from 'react-native-fast-image';
import styles from './styles'

import SharedButton from '@shared/SharedButton';
import PaymentSubmit from '../PaymentSubmit';

function PaymentLeftSide(props) {
  const { selectedType, pTypes, selectPType, } = props

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Спосіб оплати</Text>
      {pTypes.map((item, index) => (
        <TouchableOpacity
          style={[styles.paymentType, selectedType.index === index && { backgroundColor: '#2E2C2E', }]}
          onPress={() => selectPType(item)}
          activeOpacity={1}
          key={index}
        >
          {item.imageSource && (
            <FastImage
              style={{ width: 30, height: 30, marginRight: 15, }}
              source={item.imageSource}
            />
          )}

          <Text style={[styles.paymentTypeName, selectedType.index === index && { color: '#FFFFFF', }]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.heading}>Працівник</Text>

      {/* <SharedButton
        forceStyles={styles.cancelOrderButton}
        iconSizes={{ width: 0, height: 0 }}
        onPress={() => setPaymentModalVisibility(false)}
        scale={0.9}
      >
        <Text style={styles.cancelOrderButtonText}>Скасувати оплату</Text>
      </SharedButton> */}
    </View>
  )
}

export default PaymentLeftSide