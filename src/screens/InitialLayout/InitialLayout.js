import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import Carousel from 'react-native-snap-carousel';

import { deviceWidth, deviceHeight } from '../../../helpers/dimensions'

import NoAccount from './components/NoAccount/NoAccount'
import Login from './components/Login/Login'
import InputCash from './components/InputCash/InputCash'
import InputEmployees from './components/InputEmployees/InputEmployees'

import SharedBackground from '../../components/SharedBackground'

function InitialLayout({ navigation, screenProps, }) {
  const {
    initialLoadingVisibility, initialLoadingOpacity,
    changeInitialLoadingWrapperOpacity, forceSlide,
  } = screenProps

  const sliderRef = useRef(null)
  const [entries] = useState([{}, {}, {}])

  const endOfSession = useSelector(state => state.user.endOfSession)

  useEffect(() => {
    setTimeout(() => {
      sliderRef.current.snapToItem(forceSlide)
      setTimeout(() => {
        if(initialLoadingVisibility) {
          changeInitialLoadingWrapperOpacity(false)
        }
      }, 100)
    }, 250)
    
    return () => sliderRef.current.snapToItem(0)
  }, [forceSlide])

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        {!endOfSession.status ? (
          <>
            {index === 0 && <NoAccount sliderRef={sliderRef} navigation={navigation} />}
            {index === 1 && <Login sliderRef={sliderRef} navigation={navigation} />}
            {index === 2 && <InputCash sliderRef={sliderRef} navigation={navigation} />}
            {index === 3 && <InputEmployees sliderRef={sliderRef} navigation={navigation} />}
          </>
        ) : (
          <InputCash sliderRef={sliderRef} navigation={navigation} />
        )}
      </View>
    );
  }

  console.log('------->',screenProps )

  return (
    <View style={styles.container}>
      <SharedBackground
        loading={initialLoadingVisibility}
        opacity={initialLoadingOpacity}
        source={require('@images/background-adv3.png')}
      >
        <View style={styles.slider}>
          <Carousel
            ref={sliderRef}
            data={entries}
            renderItem={_renderItem}
            sliderWidth={deviceWidth}
            sliderHeight={deviceHeight}
            itemWidth={deviceWidth}
            itemHeight={deviceHeight}
            // activeSlideOffset={0}
            swipeThreshold={0}
            inactiveSlideScale={1}
            useScrollView
            scrollEnabled={false}
            delayPressIn={0}
            activeSlideOffset={2}
            enableMomentum={true}
            
          />
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