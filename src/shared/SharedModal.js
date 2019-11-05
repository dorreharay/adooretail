import React, { useEffect, } from 'react'
import { View, Text, Alert, } from 'react-native'

function SharedModal({active, children,}) {
  useEffect(() => {
    if(active) {
      Alert.alert('Nice.')
    }
    return () => {};
  }, [active])

  return (
    <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
      {children}
    </View>
  )
}

export default SharedModal
