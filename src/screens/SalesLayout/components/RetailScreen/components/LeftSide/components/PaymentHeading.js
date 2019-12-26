import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../styles'

import SharedButton from '@shared/SharedButton';

import CloseIcon from '@images/x_icon.svg'

function PaymentHeading() {
  return (
    <View style={styles.paymentHeadingContainer}>
      <Text style={styles.paymentHeadingText}>ОПЛАТА</Text>

      <CloseIcon width={30} height={30} />
    </View>
  )
}

export default PaymentHeading
