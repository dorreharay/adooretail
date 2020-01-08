import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image'
import styles from '../../../styles'

import SharedButton from '@shared/SharedButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import CloseIcon from '@images/x_icon.svg'

function PaymentHeading(props) {
  const { setPaymentModalVisibility } = props

  return (
    <View style={styles.paymentHeadingContainer}>
      <Text style={styles.paymentHeadingText}>ОПЛАТА</Text>

      <SharedButton
        onPress={() => setPaymentModalVisibility(false)}
        forceStyles={styles.paymentCloseButton}
      >
        <FastImage source={require('@images/x_icon.png')} style={{ width: 24, height: 24 }} />
      </SharedButton>
    </View>
  )
}

export default PaymentHeading
