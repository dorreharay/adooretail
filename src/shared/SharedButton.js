import React, { Component, useState, useEffect, useRef, } from 'react';
import { Animated, View, TouchableWithoutFeedback, StyleSheet, Image, Alert, Text, } from 'react-native';

function SharedButton(props) {
  const {
    children, onPress, scale, duration, onStart, buttonSizes, iconSizes,
    source, loading, backgroundColor, borderRadius, forceStyles = {},
    text, rotateOnPress, loadAgain, textStyles, key,
  } = props;

  const [animatePress] = useState(new Animated.Value(1))
  const [updateIconAnimation] = useState(new Animated.Value(0))
  const [pressed, setPressedState] = useState(false)

  const animateIn = () => {
    Animated.timing(animatePress, {
      toValue: scale ? scale : 0.7,
      duration: duration ? duration : 100,
    }).start(() => setPressedState(true))

    if(onStart) {
      onPress()
    }  
  }

  const animateOut = () => {
    Animated.timing(animatePress, {
      toValue: 1,
      duration: 200,
    }).start(() => {
      if(onPress && !onStart)
        onPress()
    })

    if(rotateOnPress)
      rotateIcon()
        if(loadAgain)
          loadAgain()
  }

  const rotateIcon = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(updateIconAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(updateIconAnimation, {
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

  const spin = updateIconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={forceStyles} key={key ? key : 0}>
      <TouchableWithoutFeedback
        onPressIn={animateIn}
        onPressOut={animateOut}
      >
        <Animated.View style={{
          ...styles.button,
          ...buttonSizes,
          borderRadius: borderRadius ? borderRadius : 5,
          backgroundColor: backgroundColor ? backgroundColor : '',
          transform: [{
            scale: animatePress
          }]
        }}>
          {loading ? (
            null
          ) : (
            children ? (
              children
            ) : (
              text ? (
                <Text style={textStyles}>{text}</Text>
              ) : (
                <Animated.Image style={{ width: iconSizes.width, height: iconSizes.height, transform: [{ rotate: spin }] }} source={source} />
              )
            )
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }
})

export default SharedButton;