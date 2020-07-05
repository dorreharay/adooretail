import React, { useEffect, useRef, } from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector, } from 'react-redux'
import BackgroundTimer from 'react-native-background-timer';
import styles from '../../../../../styles'

import { clearCurrentReceipt } from '@reducers/TempReducer'

function PaymentSubmit(props) {
  const { selectedType, buttonAccessible, saveReceipt, receipt, } = props
  const { buttonText, } = selectedType

  const timerRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  const handlePress = async () => {
    if (!buttonAccessible) {
      return () => { }
    }

    return selectedType.onPress(async () => {
      try {
        await saveReceipt(selectedType.apiName, receipt)
        if (selectedType.index === 1) {
          BackgroundTimer.setTimeout(() => {
            dispatch(clearCurrentReceipt())
          }, 500)
        } else {
          dispatch(clearCurrentReceipt())
        }
      } catch (error) {

      }
    })
  }

  return (
    <View style={styles.paymentSubmitButton}>
      <TouchableOpacity
        style={{ flex: 1, }}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#DB3E69', '#EF9058']}
          style={[styles.paymentSubmitButtonGradient, !buttonAccessible && { opacity: 0.6 }]}
        >
          <Text style={styles.paymentSubmitButtonText}>{buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default PaymentSubmit
