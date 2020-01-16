import React, { useEffect, } from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../styles'

import SharedButton from '@shared/SharedButton';

function PaymentSubmit(props) {
  const { status, selectedType, buttonAccessible, saveReceipt, receipt, } = props
  const { index, buttonText, finalButtonText } = selectedType

  const handlePress = () => selectedType.onPress(() => saveReceipt(selectedType.apiName, receipt))

  return (
    <SharedButton
      forceStyles={{ flex: 1 }}
      buttonSizes={styles.paymentSubmitButton}
      onPress={() => buttonAccessible ? handlePress() : null}
      scale={0.95}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={['#DB3E69', '#EF9058']}
        style={[styles.paymentSubmitButtonGradient, !buttonAccessible && { opacity: 0.6 }]}
      >
        <Text style={styles.paymentSubmitButtonText}>{buttonText}</Text>
      </LinearGradient>
    </SharedButton>
  )
}

export default PaymentSubmit
