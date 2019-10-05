import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, Alert, } from 'react-native'
import Carousel from 'react-native-snap-carousel';

import { deviceWidth, deviceHeight } from '../../../helpers/dimensions'

import SharedButton from '../../../src/components/SharedButton'
import RetailScreen from './components/RetailScreen/RetailScreen';
import PanelScreens from '../SalesLayout/components/RetailScreen/components/RightSide/PanelScreens/PanelScreens'

function SalesLayout({ navigation }) {
  const sliderRef = useRef(null)
  const [entries] = useState([{}, {}])

  useEffect(() => {
    return () => sliderRef.current.snapToItem(0)
  }, [])

  const slideTo = (direction) => {
    if(direction === 'next')
      sliderRef.current.snapToNext()

    if(direction === 'prev')
      sliderRef.current.snapToPrev()
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        {index === 0 && <RetailScreen slideTo={slideTo} />}
        {index === 1 && <PanelScreens slideTo={slideTo} />}
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
          bounces={false}
          swipeThreshold={0}
          inactiveSlideScale={1}
          useScrollView
          vertical
          scrollEnabled={false}
          delayPressIn={0}
          activeSlideOffset={2}
          enableMomentum={true}
        />
      </View>
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
  },
  goBack: {
    position: 'absolute',
    right: 40,
    top: 40,
    width: 50,
    height: 50,
  }
})

export default SalesLayout