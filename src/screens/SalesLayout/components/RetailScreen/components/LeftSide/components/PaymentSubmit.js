import React, { useEffect, } from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../styles'

import SharedButton from '@shared/SharedButton';

function PaymentSubmit(props) {
  const { selectedType, buttonAccessible, } = props
  const { buttonText } = selectedType

  return (
    <SharedButton
      forceStyles={{ flex: 1 }}
      buttonSizes={styles.paymentSubmitButton}
      onPress={() => buttonAccessible ? selectedType.onPress() : null}
      scale={0.95}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={buttonAccessible ? ['#DB3E69', '#EF9058'] : ['#DEDEDE', '#DEDEDE']}
        style={styles.paymentSubmitButtonGradient}
      >
        <Text style={styles.paymentSubmitButtonText}>{buttonText ? buttonText : 'Підтвердити'}</Text>
      </LinearGradient>
    </SharedButton>
  )
}

export default PaymentSubmit
