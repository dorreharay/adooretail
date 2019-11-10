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
          {!loadEnd && <Animated.View style={[styles.wrapper, { opacity, backgroundColor: '#35302C', zIndex: 10000 }]} />}
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
      <Animated.View style={styles.logoContainer}>
        <FastImage
          style={styles.logo}
          source={require('@images/logo-big.png')}
        />
      </Animated.View>
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
    zIndex: 10001,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 110,
    height: 110,
    paddingTop: 22,
    paddingLeft: 20,
    borderBottomRightRadius: 1000,
    backgroundColor: '#FFFFFF0D',
    zIndex: 50,
  },
  logo: {
    width: 37,
    height: 37,
  }
})

export default SharedBackground
