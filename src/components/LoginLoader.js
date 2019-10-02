import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text } from 'react-native';

function LoginLoader({ active }) {
  return (
    <View style={{ position: 'absolute', top: active ? 30 : -30, right: 30, }}>
      <Progress.Circle
        endAngle={0.3} size={30} color={'#434343'} 
        borderWidth={2} indeterminate={true} 
      />
    </View>
  )
}

export default LoginLoader
