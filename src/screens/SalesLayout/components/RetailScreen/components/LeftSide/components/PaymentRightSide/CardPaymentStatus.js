import React, { useState, useEffect, } from 'react'
import { View, Text, Animated, TouchableOpacity, } from 'react-native'
import styles from './styles'
import SharedButton from '@shared/SharedButton';

function CardPaymentStatus(props) {
  const { status, setStatus, initialStatuses, resetStatus, } = props
  const { statusColor, statusText, blinking, buttonText, } = status

  const [statusDotOpacity, setStatusDotOpacity] = useState(new Animated.Value(1))

  useEffect(() => {
    return () => {
      stopBlinking()
      setStatus(initialStatuses.waiting)
    }
  }, [])

  useEffect(() => {
    if (status.index === 1) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(statusDotOpacity, {
            toValue: 0,
            duration: 500
          }),
          Animated.timing(statusDotOpacity, {
            toValue: 1,
            duration: 500,
          }),
        ]),
        {
          iterations: 300
        }
      ).start()
    }
  }, [status])

  useEffect(() => {
    if (!blinking) {
      stopBlinking()
    }
  }, [blinking])

  const stopBlinking = () => {
    statusDotOpacity.stopAnimation()
    setStatusDotOpacity(new Animated.Value(1))
  }

  return (
    <View style={[styles.secondContainer, { justifyContent: 'space-between', paddingRight: '7%', }]}>
      <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>
        <View style={{ flexDirection: 'row', width: '90%', }}>
          <Animated.View style={[styles.statusDot, { backgroundColor: statusColor }, { opacity: statusDotOpacity }]} />
          <Text style={styles.paidText}>{statusText}</Text>
        </View>
        
        {/* {status.index === 1 && (
          <SharedButton
            forceStyles={styles.cancelPaymentProcessButton}
            onPress={resetStatus}
          >
            <Text style={styles.cancelPaymentProcessText}>Відмінити</Text>
          </SharedButton>
        )} */}
      </View>
    </View>
  )
}

export default CardPaymentStatus
