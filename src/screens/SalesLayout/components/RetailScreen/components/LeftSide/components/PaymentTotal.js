import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'
import styles from '../../../styles'

import SharedButton from '@shared/SharedButton';

function PaymentTotal(props) {
  const { setPaymentModalVisibility } = props

  return (
    <View style={styles.paymentTotalContainer}>
      <Text style={styles.paymentTotalText}>Сплачено - 250 грн</Text>
      <Text style={styles.paymentTotalText}>Всього - 250 грн</Text>
    </View>
  )
}



export default PaymentTotal
