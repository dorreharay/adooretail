import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import Carousel from 'react-native-snap-carousel';

import { deviceWidth, deviceHeight } from '../../../helpers'

import Login from './components/Login/LoginContainer'
import InputCash from './components/StartSession/InputCash'
import InputEmployee from './components/StartSession/InputEmployee/InputEmployeeContainer'
import SharedBackground from '../../components/SharedBackground'

function InitialLayout({ navigation }) {
  const sliderRef = useRef(null)
  const [entries] = useState([{}, {}, {}])

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        {index === 0 && <Login snapToIndex={sliderRef.current.snapToNext} navigation={navigation} />}
        {index === 1 && <InputCash navigation={navigation} />}
        {index === 2 && <InputEmployee navigation={navigation} />}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Carousel
          ref={sliderRef}
          data={entries}
          renderItem={_renderItem}
          sliderWidth={deviceWidth}
          sliderHeight={deviceHeight}
          itemWidth={deviceWidth}
          itemHeight={deviceHeight}
          activeSlideOffset={0}
          swipeThreshold={0}
          inactiveSlideScale={1}
          useScrollView
          // scrollEnabled={false}
        />
      </View>
      <SharedBackground source={require('../../../assets/images/background.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    flex: 1,
    zIndex: 1000,
  }
})

export default InitialLayout