import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../styles'

import SharedButton from '@shared/SharedButton';

function PaymentSubmit() {
  return (
    <SharedButton
      forceStyles={{ flex: 1 }}
      buttonSizes={styles.paymentSubmitButton}
      onPress={() => { }}
      scale={0.95}
      backgroundColor={'red'}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={['#DB3E69', '#EF9058']}
        style={styles.paymentSubmitButtonGradient}
      >
        <Text style={styles.paymentSubmitButtonText}>Підтвердити</Text>
      </LinearGradient>
    </SharedButton>
  )
}

export default PaymentSubmit
