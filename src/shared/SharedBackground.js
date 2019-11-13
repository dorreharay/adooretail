import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import LoginLoader from '@shared/LoginLoader';

function SharedBackground({ source, children, loading, opacity, mainWrapper, navigation, }) {
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

      {/* {true && (
        <View style={styles.navButtons}>
          <TouchableOpacity style={styles.forwardButton} onPress={() => navigation.navigate('InputEmployee')} activeOpacity={1}>
            <Image style={{ width: 18, height: 18, }} source={require('@images/erase.png')} fadeDuration={0}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('InputEmployee')} activeOpacity={1}>
            <Image style={{ width: 18, height: 18, }} source={require('@images/erase.png')} fadeDuration={0}></Image>
          </TouchableOpacity>
        </View>
      )} */}
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
  },
  navButtons: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 105,
    zIndex: 50,
  },
  forwardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D2D2D226',
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D2D2D226',
    transform: [{ rotate: '180deg'}]
  }
})

export default SharedBackground
