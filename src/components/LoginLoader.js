import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, Platform } from 'react-native';

function LoginLoader({ active }) {
  const top = Platform.OS === 'android' ? 30 : 60

  return (
    <View style={{ position: 'absolute', top: active ? top : -top, right: top - 10, }}>
      <Progress.Circle
        endAngle={0.3} size={30} color={'#FFFFFF66'} 
        borderWidth={2} indeterminate={true} 
      />
    </View>
  )
}

export default LoginLoader
