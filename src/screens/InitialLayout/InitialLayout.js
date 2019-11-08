import React, { useRef, useState, useEffect, useMemo, } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import { useSelector, useDispatch, } from 'react-redux'
import Swiper from 'react-native-swiper'
import _ from 'lodash'

import { deviceWidth, deviceHeight } from '../../../helpers/dimensions'

import NoAccount from './components/NoAccount/NoAccount'
import Login from './components/Login/Login'
import InputCash from './components/InputCash/InputCash'
import InputEmployees from './components/InputEmployees/InputEmployees'

import SharedBackground from '@shared/SharedBackground'
import { setEndOfSessionStatus } from '../../../reducers/TempReducer';

function InitialLayout({ navigation, screenProps }) {
  const { initialLoadingVisibility, changeInitialLoadingWrapperOpacity, } = screenProps

  const dispatch = useDispatch()

  const sliderRef = useRef(null)

  const endOfSession = useSelector(state => state.temp.endOfSession)
  const forceSlide = useSelector(state => state.temp.forceSlide)

  // useEffect(() => {
  //   console.log('endOfSession', endOfSession)
  //   if(endOfSession && sliderRef.current) {
  //     sliderRef.current.scrollBy(1, false)
  //   }
  // }, [endOfSession, sliderRef.current])

  return (
    <View style={styles.container}>
      <SharedBackground
        loading={false}
        source={require('@images/background-adv3.png')}
      >
        <View style={styles.slider}>
          <Swiper
            ref={sliderRef}
            style={styles.wrapper}
            showsPagination={false}
            scrollEnabled={false}
            index={0}
          >
            <View style={styles.container}>
              <NoAccount sliderRef={sliderRef} navigation={navigation} />
            </View>
            <View style={styles.container}>
              <Login sliderRef={sliderRef} navigation={navigation} />
            </View>
            <View style={styles.container}>
              <InputCash sliderRef={sliderRef} navigation={navigation} />
            </View>
            <View style={styles.container}>
              <InputEmployees sliderRef={sliderRef} navigation={navigation} />
            </View>
          </Swiper>
        </View>
      </SharedBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    flex: 1,
  }
})

export default InitialLayout