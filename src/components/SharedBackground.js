import React from 'react'
import { View, Image, StyleSheet, Text, Animated, } from 'react-native'

function SharedBackground({ source, children, isWrapper, loading, opacity, }){
  return (
    <View style={styles.container}>
      {loading && (
        <>
          <Animated.Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity, zIndex: 10000 }} source={source}></Animated.Image>
          {/* <Animated.View style={[styles.container, { opacity, zIndex: 1000, }]}>
            <Text style={{ color: '#FFFFFF', fontSize: 25, fontFamily: 'futura_light' }}>Синхронізація...</Text>
          </Animated.View> */}
        </>
      )}

      <View style={styles.container}>
        {children}
      </View>
      <Image style={{ width: '100%', height: '100%', zIndex: 10 }} source={source}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
})

export default SharedBackground
