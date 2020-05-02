import React, { useState, } from 'react'
import { View, Text, Animated, Easing, TouchableOpacity, ScrollView, } from 'react-native'
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image';
import styles from './styles'

function SharedPaymentOption(props) {
  const { children } = props

  const [arrowRotation] = useState(new Animated.Value(0))
  const [contentCollapsed, setContentCollapsed] = useState(true)

  const toggleCollapse = () => {
    if (contentCollapsed) {
      expandContent()
    } else {
      collapseContent()
    }
  }

  const expandContent = () => {
    Animated.timing(
      arrowRotation,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    setContentCollapsed(false)
  }

  const collapseContent = () => {
    Animated.timing(
      arrowRotation,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
      }
    ).start()

    setContentCollapsed(true)
  }

  const spin = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const AnimatedImage = Animated.createAnimatedComponent(FastImage)
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headingContainer}
        onPress={toggleCollapse}
        activeOpacity={0.8}
      >
        <Text style={styles.headingText}>Знижка</Text>
        <AnimatedImage
          style={[styles.arrowStyles, { transform: [{ rotate: spin }] }]}
          source={require('@images/down-arrow.png')}
        />
      </TouchableOpacity>


      <Collapsible style={styles.collapsibleContainer} collapsed={contentCollapsed}>
        <ScrollView
          style={{  }}
          contentContainerStyle={styles.contentContainerStyle}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </Collapsible>
    </View>
  )
}

export default SharedPaymentOption
