import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, Platform, Animated } from 'react-native';

function LoginLoader({ active, opacity }) {
  const top = Platform.OS === 'android' ? 30 : 60

  return (
    <Animated.View style={{ position: 'absolute', top: active ? top : -top, right: top, opacity: opacity ? opacity : 1, zIndex: 100000, }}>
      <Progress.Circle
        endAngle={0.3} size={30} color={'#FFFFFF66'} 
        borderWidth={2} indeterminate={true} 
      />
    </Animated.View>
  )
}

export default LoginLoader
