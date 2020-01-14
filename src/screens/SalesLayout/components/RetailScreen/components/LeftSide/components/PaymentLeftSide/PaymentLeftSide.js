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
      {/* <Text style={styles.heading}>Працівник</Text>

      <View style={styles.currentEmployee}>
        <FastImage
          style={styles.currentEmployeeImage}
          // source={require('@images/status_waiting.png')}
          source={null}
        />
        <Text ellipsizeMode='tail' numberOfLines={1} style={styles.currentEmployeeName}>Андрій Бариста</Text>
      </View> */}
    </View>
  )
}

export default PaymentLeftSide