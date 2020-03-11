import React, { useRef, useState, useEffect, } from 'react';
import { Animated, View, TouchableWithoutFeedback, StyleSheet, Image, Alert, Text, } from 'react-native';

function SharedButton(props) {
  const {
    style = {}, iconStyle, source, svgSource,
    borderRadius, scale, duration, loading,
    onPress, rotateOnPress, children, onLongPress,
  } = props

  const timerRef = useRef(null)

  const [animatePress] = useState(new Animated.Value(1))
  const [animateRotation] = useState(new Animated.Value(0))

  const animateIn = () => {
    // timerRef.current = setTimeout(animateIn, 400)

    Animated.timing(animatePress, {
      toValue: scale ? scale : 0.7,
      duration: duration ? duration : 100,
    }).start()
  }

  const animateOut = () => {
    clearTimeout(timerRef.current)

    Animated.timing(animatePress, {
      toValue: 1,
      duration: 200,
    }).start()

    if (rotateOnPress) {
      rotateIcon()
    }
  }

  const rotateIcon = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animateRotation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(animateRotation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ]),
      {
        iterations: 1
      }
    ).start()
  }

  const renderContent = () => {
    if (children) return (
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', }}>{children}</View>
    )

    if (loading) {
      return <Text>Loading...</Text>
    }

    return (
      <Animated.View style={{ ...iconStyle, transform: [{ rotate: spin }] }}>
        {svgSource ? (
          svgSource
        ) : (
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: borderRadius ? borderRadius : 0,
              }}
              source={source ? source.uri ? { uri: source.uri } : source : null}
            />
          )}
      </Animated.View>
    )
  }

  const relativeStyles = [
    { ...style },
    style.flexDirection && { flexDirection: style.flexDirection },
    {
      ...styles.button,
      borderRadius: borderRadius ? borderRadius : 5,
      transform: [{
        scale: animatePress
      }]
    },
  ]

  const spin = animateRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={children ? { ...style, backgroundColor: 'transparent' } : {}}>
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={animateIn}
        onPressOut={animateOut}
        onLongPress={onLongPress}
      >
        <Animated.View style={children ? {
          transform: [{
            scale: animatePress
          }],
          width: style.width,
          height: style.height,
          borderRadius: style.borderRadius,
          backgroundColor: style.backgroundColor
        } : relativeStyles}>
          {renderContent()}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default SharedButton;