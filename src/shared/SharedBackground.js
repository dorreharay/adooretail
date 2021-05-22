import React from 'react'
import { View, StyleSheet } from 'react-native'

function SharedBackground({ children, }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {children}
      </View>
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
