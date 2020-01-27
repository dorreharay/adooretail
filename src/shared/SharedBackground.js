import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Animated, Platform, } from 'react-native'
import FastImage from 'react-native-fast-image'
import Logo from '@images/logo-big.svg'

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
        {/* <FastImage
          style={styles.logo}
          source={require('@images/logo-big.svg')}
        /> */}
        <Logo width={65} height={65} />
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
    width: 70,
    height: 70,
    paddingTop: 20,
    paddingLeft: 15,
    zIndex: 50,
  },
  logo: {
    width: 65,
    height: 65,
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
    transform: [{ rotate: '180deg' }]
  }
})

export default SharedBackground
