import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, Animated, TouchableOpacity, Alert, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux';
import FastImage from 'react-native-fast-image'
import Logo from '@images/logo-big.svg'

import SharedButton from '@shared/SharedButton';
import { setActiveBackgroundIndex } from '@reducers/UserReducer'

function SharedBackground({ image, children, }) {
  const [loadEnd, setLoadEnd] = useState(false)

  const dispatch = useDispatch()

  const currentRoute = useSelector(state => state.temp.currentRoute)
  const activeBackgroundIndex = useSelector(state => state.user.activeBackgroundIndex)

  const [backgrounds] = useState([
    require('@images/background-adv7.png'),
    require('@images/background-adv8.png'),
    require('@images/background-adv9.png'),
    require('@images/background-adv10.png'),
    require('@images/background-adv11.png'),
    // require('@images/background-adv12.png'),
  ])

  const changeBackgroudIndex = () => {
    let index = null

    if (activeBackgroundIndex < (backgrounds.length - 1)) {
      index = activeBackgroundIndex + 1
    } else {
      index = 0
    }

    dispatch(setActiveBackgroundIndex(index))
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {currentRoute !== 4 && currentRoute !== 5 && (
          <SharedButton
            style={styles.logoContainer}
            onPress={changeBackgroudIndex}
            scale={0.85}
          >
            <Logo width={65} height={65} />
          </SharedButton>
        )}


        {children}
      </View>

      <FastImage style={{ width: '100%', height: '101%', top: -1, zIndex: 10 }} source={backgrounds[activeBackgroundIndex]} />
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
