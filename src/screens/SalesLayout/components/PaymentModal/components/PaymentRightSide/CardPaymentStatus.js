import React, { useState, useEffect, } from 'react'
import { View, Text, Animated, } from 'react-native'
import styles from './styles'

function CardPaymentStatus(props) {
  const { status, setStatus, initialStatuses, isVisible, } = props
  const { statusColor, statusText, blinking, } = status

  const [statusDotOpacity, setStatusDotOpacity] = useState(new Animated.Value(1))

  const stopBlinking = () => {
    statusDotOpacity.stopAnimation()
    setStatusDotOpacity(new Animated.Value(1))
  }

  useEffect(() => {
    return () => {
      stopBlinking()
      setStatus(initialStatuses.waiting)
    }
  }, [isVisible])

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

  return (
    <View style={[styles.secondContainer, { justifyContent: 'space-between', paddingRight: '7%', }]}>
      <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', }}>
          <Animated.View style={[styles.statusDot, { backgroundColor: statusColor }, { opacity: statusDotOpacity }]} />
          <Text style={styles.waitingText}>{statusText}</Text>
        </View>
      </View>
    </View>
  )
}

export default CardPaymentStatus
