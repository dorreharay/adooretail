import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Animated, } from 'react-native'
import FastImage from 'react-native-fast-image'

import LoginLoader from '@shared/LoginLoader';

function SharedBackground({ source, children, loading, opacity, mainWrapper, }) {
  const [loadEnd, setLoadEnd] = useState(false)

  const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

  return (
    <View style={styles.container}>
      {loading && !mainWrapper && (
        <>
          {!loadEnd && <Animated.View style={[styles.wrapper, { opacity, backgroundColor: '#35302C' }]} />}
          <AnimatedFastImage
            style={[styles.wrapper, { opacity }]}
            source={source}
            onLoadEnd={() => setLoadEnd(true)}
          />
          <LoginLoader active={true} opacity={opacity} />
        </>
      )}

      <View style={styles.container}>
        {children}
      </View>
      <Image style={{ width: '100%', height: '101%', top: -1, zIndex: 10 }} source={source}></Image>
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
  wrapper: {
    position: 'absolute',
    top: -1,
    left: 0,
    width: '100%',
    height: '101%',
    zIndex: 10000,
  }
})

export default SharedBackground
