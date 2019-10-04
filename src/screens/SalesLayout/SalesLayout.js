import React, { useRef, useState, useEffect, } from 'react'
import { Text, View, Image, StyleSheet, } from 'react-native'
import Carousel from 'react-native-snap-carousel';

import { deviceWidth, deviceHeight } from '../../../helpers/dimensions'

import RetailScreen from './components/RetailScreen/RetailScreen';

function SalesLayout({ navigation }) {
  const sliderRef = useRef(null)
  const [entries] = useState([{}, {}])

  useEffect(() => {
    return () => sliderRef.current.snapToItem(0)
  }, [])

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        {index === 0 && <RetailScreen sliderRef={sliderRef} />}
        {index === 1 && <View style={{ flex: 1, backgroundColor: 'yellow' }} />}
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
          scrollEnabled={true}
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
  }
})

export default SalesLayout