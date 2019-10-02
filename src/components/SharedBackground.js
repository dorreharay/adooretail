import React from 'react'
import { View, Image, StyleSheet, } from 'react-native'

function SharedBackground({ source }){
  return (
    <View style={styles.container}>
      <Image style={{ width: '100%', height: '100%', }} source={source}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  }
})

export default SharedBackground
